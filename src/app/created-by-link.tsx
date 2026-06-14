"use client";

import { trackEvent } from "@/lib/analytics";

import styles from "./page.module.css";

export function CreatedByLink() {
  return (
    <a
      className={styles.primary}
      href="https://joaopedro.dev"
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        trackEvent("cta_click", {
          location: "hero",
          label: "Created by João Pedro",
          timestamp: new Date().toISOString(),
        });
      }}
    >
      Created by João Pedro
    </a>
  );
}
