declare namespace NodeJS {
  interface ProcessEnv {
    // SESSION_COOKIE_KEY: string;
    // NEXT_PUBLIC_API_ENDPOINT: string;
    // NEXT_PUBLIC_GRAPHQL_API_ENDPOINT: string;
    //
    GRAPHQL_API_ENDPOINT: string;

    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
    CLOUDFLARE_TURNSTILE_SECRET_KEY: string;

    NEXT_PUBLIC_AUTH0_DOMAIN: string;
    NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
    NEXT_PUBLIC_AUTH0_AUDIENCE: string;
  }
}
