export interface HashAdapter {
  hash(password: string): Promise<string>;
  compare(password: string, passwordDb: string): Promise<boolean>;
}
