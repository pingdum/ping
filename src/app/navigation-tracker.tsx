'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getGaUser } from '@/lib/analytics';

/**
 * Tracks client-side route changes in the App Router.
 *
 * The `<GoogleAnalytics />` component only fires the initial `page_view` (via `gtag('config')`);
 * it does NOT report subsequent client-side navigations. This component fills that gap and, on
 * every navigation, sends a `page_view` whose `page_referrer` is the previous in-app URL — giving
 * GA4 an accurate "from → to" flow (visible in Path exploration / Pages and screens).
 *
 * Must be rendered inside a <Suspense> boundary because it reads `useSearchParams()`.
 */
export function NavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // Skip the first render: gtag('config') already sent the initial page_view (with the real
    // external document.referrer). Re-sending here would double-count the landing page.
    if (previousUrl.current === null) {
      previousUrl.current = url;
      return;
    }

    if (previousUrl.current === url) return;

    sendGAEvent('event', 'page_view', {
      page_location: window.location.href,
      page_path: url,
      page_referrer: previousUrl.current,
      username: getGaUser() ?? '(chưa nhập tên)',
    });

    previousUrl.current = url;
  }, [pathname, searchParams]);

  return null;
}
