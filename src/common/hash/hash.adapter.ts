import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashAdapter {
  private bcrypt: typeof bcrypt = bcrypt;
  private saltOrRounds: number = 10;
  async hash(password: string) {
    return await this.bcrypt.hash(password, this.saltOrRounds);
  }
  async compare(password: string, passwordDb: string) {
    return await this.bcrypt.compare(password, passwordDb);
  }
}
