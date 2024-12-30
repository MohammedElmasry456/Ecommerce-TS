declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: any;
    readonly DB: string;
    readonly NODE_ENV: string;
    readonly BASE_URL: string;
    readonly JWT_SECRET_KEY: string;
    readonly JWT_EXPIRE_TIME: string;
    readonly RESET_EXPIRE_TIME: string;
    readonly EMAIL_NAME: string;
    readonly EMAIL_HOST: string;
    readonly EMAIL_PASSWORD: string;
    readonly APP_NAME: string;
  }
}
