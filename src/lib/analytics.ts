import { sendGAEvent } from '@next/third-parties/google';

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
