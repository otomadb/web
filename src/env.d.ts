declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_ENDPOINT: string;
    NEXT_PUBLIC_MSW_ENABLE?: "true";
  }
}
