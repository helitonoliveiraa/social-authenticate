declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test',
    JWT_SECRET: string,
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    SERVER_ROOT_URI: string;
    ROOT_AUTH_URL: string;
    APIS_USERINFO_PROFILE: string;
    APIS_USERINFO_EMAIL: string;
    UI_ROOT_URI: string;
  }
}