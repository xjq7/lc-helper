export interface AuthConfig {
  access_token: string;
}

export const authConfig: AuthConfig = { access_token: 'access_token' };

export interface AuthCookie {
  csrftoken: string;
}

export const authCookie: AuthCookie = { csrftoken: '' };

export interface AppConfig {
  version: string;
  platform: string;
}

export const appConfig = { version: '2.9.4', platform: 'iOS' };
