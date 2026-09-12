# StackLab.work — Web Frontend Infrastructure

Production containerization and edge routing setup for **StackLab.work** (Astro static application), engineered by the Infrastructure & Networking duo (`docker-expert` + `network-engineer`).

---

## 🏗️ Architecture Overview

```
                          [ Internet / Visitors ]
                                     │ (HTTPS / TLS 1.3)
                                     ▼
                      ┌─────────────────────────────┐
                      │    Cloudflare Edge (WAF)    │
                      └──────────────┬──────────────┘
                                     │ (Encrypted Tunnel / HTTP2)
                                     ▼
                      ┌─────────────────────────────┐
                      │  Container: cloudflared     │
                      │  (homelab_stacklab_network) │
                      └──────────────┬──────────────┘
                                     │
                 Internal Docker DNS │ (http://stacklab_web:80)
                                     ▼
                      ┌─────────────────────────────┐
                      │   Container: stacklab_web   │
                      │      (nginx:alpine-slim)    │
                      │   - Gzip compression        │
                      │   - Security headers        │
                      │   - 1y immutable cache      │
                      │   - Healthcheck: /health    │
                      └─────────────────────────────┘
```

---

## 📁 Key Components

| File | Purpose | Size / Baseline |
| :--- | :--- | :--- |
| [`nginx.conf`](./nginx.conf) | Optimized Nginx config with Gzip, security headers, `/health`, and 1-year asset cache | Minimal & Hardened |
| [`Dockerfile`](./Dockerfile) | Multi-stage build (`node:22-alpine` -> `nginx:alpine-slim`) | **< 25 MB** total image |
| [`docker-compose.yml`](./docker-compose.yml) | Orchestration definition connected to `stacklab_network` | `restart: always` |
| [`.dockerignore`](./.dockerignore) | Build context filtering for fast caching and zero leakage | Optimized |

---

## 🔒 1. Nginx Hardening & Optimization (`nginx.conf`)

- **Gzip Compression**: Level 6, buffer sizes `16 8k`, min length `256`, applied across text, CSS, JS, SVG, and JSON.
- **Security Headers**:
  - `X-Frame-Options: SAMEORIGIN` (prevents clickjacking).
  - `X-Content-Type-Options: nosniff` (mitigates MIME confusion attacks).
  - `X-XSS-Protection: 1; mode=block` (legacy client defense).
  - `Referrer-Policy: strict-origin-when-cross-origin` (privacy-safe cross-origin requests).
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` (disables unused browser APIs).
  - `server_tokens off` (hides Nginx version from banner grabs).
- **Cache Strategy**:
  - `/_astro/*`: `Cache-Control: public, max-age=31536000, immutable` (1 year immutable cache for Astro content-hashed bundles).
  - Media & fonts: `Cache-Control: public, max-age=2592000` (30 days).
  - HTML & navigation: `Cache-Control: public, max-age=0, must-revalidate` (instant updates on redeploy).
- **Healthcheck Endpoint**:
  - Path: `/health` -> returns `200 OK` (unlogged for log hygiene).

---

## 🐳 2. Multi-Stage Dockerfile

Built according to the StackLab Software DNA guidelines:
1. **Builder Stage (`node:22-alpine`)**:
   - Copies dependency manifests (`package*.json`).
   - Executes `npm ci` leveraging Docker layer cache.
   - Compiles static assets via `npm run build` into `/app/dist`.
2. **Runner Stage (`nginx:alpine-slim`)**:
   - Ultra-lightweight footprint (< 25MB).
   - Cleans all default configuration and sample files.
   - Mounts `/health` healthcheck with `wget` retry loop:
     ```dockerfile
     HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
       CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/health || exit 1
     ```

---

## 🌐 3. Docker Network & Compose

In `homelab/docker-compose.yml`, the common bridge network is defined as `stacklab_network`, creating the Docker daemon network `homelab_stacklab_network`.

`stacklab-web/docker-compose.yml` connects to this existing network:
```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: stacklab-web:latest
    container_name: stacklab_web
    restart: always
    expose:
      - "80"
    networks:
      - stacklab_network

networks:
  stacklab_network:
    external: true
    name: ${STACKLAB_NETWORK_NAME:-homelab_stacklab_network}
```

> [!NOTE]
> Port 80 is **not** bound to `0.0.0.0` on the host interface. It is only accessible within the internal Docker bridge network (`homelab_stacklab_network`). Only Cloudflare Tunnel routes traffic to it, enforcing strict Zero Trust boundary isolation.

---

## 🚇 4. Cloudflare Tunnel Ingress Rule

The running Cloudflare Tunnel container (`cloudflared_tunnel`) shares the `homelab_stacklab_network` bridge.

### Option A: Cloudflare Zero Trust Dashboard (Recommended)

1. Open **Cloudflare Zero Trust** -> **Networks** -> **Tunnels**.
2. Select your active tunnel (associated with `TUNNEL_TOKEN`).
3. Under the **Public Hostnames** tab, click **Add a public hostname**:
   - **Subdomain**: `@` (or leave empty for apex domain `stacklab.work`)
   - **Domain**: `stacklab.work`
   - **Path**: *(empty)*
   - **Type**: `HTTP`
   - **URL**: `stacklab_web:80`
4. *(Optional)* Repeat for `www.stacklab.work`:
   - **Subdomain**: `www`
   - **Domain**: `stacklab.work`
   - **Type**: `HTTP`
   - **URL**: `stacklab_web:80`

### Option B: Local Tunnel Configuration (`config.yml`)

If using CLI-managed tunnel configuration:
```yaml
tunnel: <TUNNEL_UUID>
credentials-file: /etc/cloudflared/<TUNNEL_UUID>.json

ingress:
  # StackLab Web - Astro Landing & Application
  - hostname: stacklab.work
    service: http://stacklab_web:80
  - hostname: www.stacklab.work
    service: http://stacklab_web:80

  # Homelab Cockpit / Portal
  - hostname: portal.stacklab.work
    service: http://stacklab_portal:3000

  # N8N Automations
  - hostname: n8n.stacklab.work
    service: http://n8n:5678

  # Fallback catch-all rule
  - service: http_status:404
```

---

## 🚀 5. Quick Start & Operations

### Build and Start Container
```bash
cd /home/luistler/Proyectos/stacklab-web
docker compose up -d --build
```

### Verify Container Health & Status
```bash
docker ps --filter "name=stacklab_web"
docker inspect --format='{{json .State.Health}}' stacklab_web
```

### Test Internal Health Endpoint
```bash
docker exec -it stacklab_web wget -qO- http://127.0.0.1:80/health
# Output: OK
```

### Test DNS Resolution from Cloudflare Tunnel
```bash
docker exec -it cloudflared_tunnel getent hosts stacklab_web
```
