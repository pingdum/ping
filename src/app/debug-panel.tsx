'use client';

import { useEffect, useState } from 'react';

import styles from './debug-panel.module.css';

type GtagCall = { id: number; command: string; label: string; params: unknown };

/**
 * Local, instant view of GA4 events. Intercepts pushes to `window.dataLayer` (which is how
 * `gtag()` queues calls) and renders the most recent `event`/`set` calls on screen — so you can
 * verify tracking immediately, without waiting for GA4 Realtime/DebugView and without an ad-blocker
 * swallowing the request. Dev-only.
 */
export function DebugPanel() {
  const [calls, setCalls] = useState<GtagCall[]>([]);
  const enabled = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    if (!enabled) return;

    const target = window as unknown as { dataLayer?: unknown[] };
    const dataLayer = (target.dataLayer = target.dataLayer ?? []);
    const originalPush = dataLayer.push.bind(dataLayer);
    let counter = 0;

    dataLayer.push = (...items: unknown[]) => {
      for (const item of items) {
        const args = Array.from(item as ArrayLike<unknown>);
        const command = String(args[0] ?? '');
        if (command === 'event' || command === 'set') {
          counter += 1;
          const id = counter;
          const label = typeof args[1] === 'string' ? args[1] : '';
          const params = args[args.length - 1];
          setCalls((prev) => [{ id, command, label, params }, ...prev].slice(0, 15));
        }
      }
      return originalPush(...items);
    };

    return () => {
      dataLayer.push = originalPush;
    };
  }, [enabled]);

  if (!enabled || calls.length === 0) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.title}>GA events (local) · {calls.length}</div>
      {calls.map((call) => (
        <div key={call.id} className={styles.row}>
          <strong>
            {call.command}
            {call.label ? ` · ${call.label}` : ''}
          </strong>
          <pre>{JSON.stringify(call.params)}</pre>
        </div>
      ))}
    </div>
  );
}
