export interface AuthConfig {
  session: string;
}

export const authConfig: AuthConfig = {
  session: '',
};

export interface AppConfig {
  version: string;
  platform: string;
}

export const appConfig = { platform: 'iOS' };
