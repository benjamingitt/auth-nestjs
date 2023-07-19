export interface IPostgresConfig {
  readonly host: string;
  readonly port?: number | string;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly dialect?: string;
  readonly urlDatabase?: string;
}
export interface IDatabaseConfig {
  development: IPostgresConfig;
  test: IPostgresConfig;
  production: IPostgresConfig;
}
