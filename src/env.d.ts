declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDFLARE_TURNSTILE_SECRET_KEY: string;

    NEXT_PUBLIC_API_ENDPOINT: string;
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
  }
}
