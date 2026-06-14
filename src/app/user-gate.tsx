'use client';

import { useEffect, useState } from 'react';

import { GA_USER_STORAGE_KEY, setGaUser } from '@/lib/analytics';

import styles from './user-gate.module.css';

/**
 * On first visit, prompts for a username and stores it. The name is registered with GA4 as the
 * `user_id` / `username` user property, so all subsequent page views and events are attributed to
 * that user — letting you see "this user went from page A → B → C" in reports.
 *
 * Once a name is set it renders a small badge (with a reset link) instead of the modal.
 */
export function UserGate() {
  const [name, setName] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(GA_USER_STORAGE_KEY);
    if (stored) {
      setName(stored);
      setGaUser(stored);
    }
    setReady(true);
  }, []);

  // Avoid a flash of the modal before localStorage is read.
  if (!ready) return null;

  if (!name) {
    return (
      <div className={styles.overlay}>
        <form
          className={styles.modal}
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = input.trim();
            if (!trimmed) return;
            localStorage.setItem(GA_USER_STORAGE_KEY, trimmed);
            setGaUser(trimmed);
            setName(trimmed);
          }}
        >
          <h2>Nhập tên của bạn</h2>
          <p>Tên này được dùng để theo dõi hành trình của bạn qua các trang.</p>
          <input
            // oxlint-disable-next-line jsx_a11y/no_autofocus
            autoFocus
            className={styles.input}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ví dụ: loc.dang"
          />
          <button type="submit" className={styles.button}>
            Bắt đầu
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.badge}>
      <span>👤 {name}</span>
      <button
        type="button"
        className={styles.reset}
        onClick={() => {
          localStorage.removeItem(GA_USER_STORAGE_KEY);
          setName(null);
          setInput('');
        }}
      >
        đổi tên
      </button>
    </div>
  );
}
