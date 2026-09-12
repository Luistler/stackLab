/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
    lenis?: Lenis;
    playMechanicalClick?: (freq?: number, duration?: number) => void;
    openToolModal?: (modalId: string) => void;
    closeToolModal?: (modalOrId: HTMLElement | string) => void;
    __soundEnabled?: boolean;
  }
}

export {};
