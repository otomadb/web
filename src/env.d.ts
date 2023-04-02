declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDFLARE_TURNSTILE_SECRET_KEY: string;

    SUPERTOKENS_CORE_CONNECTION_URI: string;
    SUPERTOKENS_CORE_API_KEY: string;

    SESSION_COOKIE_KEY: string;

    NEXT_PUBLIC_API_ENDPOINT: string;
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
  }
}
