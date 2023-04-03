declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDFLARE_TURNSTILE_SECRET_KEY: string;

    SESSION_COOKIE_KEY: string;

    NEXT_PUBLIC_API_ENDPOINT: string;
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string;

    NEXT_PUBLIC_AUTH0_DOMAIN: string;
    NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
  }
}
