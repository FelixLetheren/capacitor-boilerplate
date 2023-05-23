declare type Environment = 'dev' | 'staging' | 'prod';

declare interface IAppConfig {
  apiBaseUrl: string;
  environment: Environment;
}

declare let APP_CONFIG: IAppConfig;
