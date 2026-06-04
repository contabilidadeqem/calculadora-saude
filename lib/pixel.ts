/**
 * Wrapper tipado para o Meta Pixel (fbq). Funciona como no-op se o Pixel
 * não estiver carregado (SSR, primeira renderização, ou Pixel ID não configurado).
 */

declare global {
  interface Window {
    fbq?: (
      action: "init" | "track" | "trackCustom" | "consent",
      eventNameOrId: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function pixelEnabled(): boolean {
  return Boolean(META_PIXEL_ID);
}

/**
 * Gera um ID único pra deduplicar evento entre Pixel (client) e CAPI (server).
 * O servidor recebe o mesmo eventId e envia pra Meta com o mesmo valor — Meta
 * deduplica automaticamente.
 */
export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Eventos padrão do Meta. */
export type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "InitiateCheckout"
  | "Contact"
  | "Search";

/** Dispara um evento padrão. Silencioso se Pixel não estiver carregado. */
export function trackEvent(
  event: StandardEvent,
  params?: Record<string, unknown>,
  eventId?: string
) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;
  if (eventId) {
    window.fbq("track", event, params, { eventID: eventId });
  } else {
    window.fbq("track", event, params);
  }
}

/** Dispara um evento custom. */
export function trackCustom(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string
) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;
  if (eventId) {
    window.fbq("trackCustom", event, params, { eventID: eventId });
  } else {
    window.fbq("trackCustom", event, params);
  }
}
