export interface IConfig {
  session?: string;
  platform?: string;
  version?: string;
  authorization?: string;
}

class Config {
  static _config: IConfig = {
    version: '2.14.1',
    platform: 'iOS',
  };
  static get() {
    return Config._config;
  }
  static set(config: Config) {
    Config._config = { ...Config._config, ...config };
  }
}

export { Config };
