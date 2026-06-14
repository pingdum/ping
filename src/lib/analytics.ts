import { sendGAEvent } from '@next/third-parties/google';

/** localStorage key holding the entered username. */
export const GA_USER_STORAGE_KEY = 'ga_username';

/**
 * Send a custom event to Google Analytics 4.
 *
 * No-op when `NEXT_PUBLIC_GA_ID` is unset, since the GA script isn't loaded — safe to call
 * unconditionally from any client component.
 *
 * @example
 * trackEvent('sign_up', { method: 'google' });
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  sendGAEvent('event', name, params ?? {});
}

/**
 * Associate every subsequent GA4 event with a user. Sets both `user_id` (the canonical
 * cross-session identifier) and a `username` user property (so it's filterable in reports).
 */
export function setGaUser(userId: string) {
  sendGAEvent('set', { user_id: userId });
  sendGAEvent('set', 'user_properties', { username: userId });
}

/** Read the stored username (client-side only). */
export function getGaUser(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(GA_USER_STORAGE_KEY);
}
