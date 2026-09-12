FROM nginx:alpine-slim

LABEL maintainer="StackLab Infrastructure <infra@stacklab.work>" \
      project="stacklab-web" \
      version="1.0.0" \
      environment="production"

# Remove default boilerplate configuration and index files
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy hardened, optimized Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy compiled static distribution from host
COPY dist /usr/share/nginx/html


# Adjust ownership and permissions for secure runtime
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose internal HTTP port
EXPOSE 80

# Healthcheck targeting /health endpoint (uses BusyBox wget built into Alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/health || exit 1

# Graceful shutdown signal
STOPSIGNAL SIGQUIT

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
