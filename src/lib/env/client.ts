import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const clientEnv = createEnv({
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    /**
     * Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Optional: when unset, analytics
     * is disabled (useful for local development and previews).
     */
    NEXT_PUBLIC_GA_ID: z.string().startsWith('G-').optional(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
