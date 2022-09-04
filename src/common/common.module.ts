import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashAdapter } from './hash/hash.adapter';
@Module({
  imports: [ConfigModule],
  providers: [HashAdapter],
  exports: [HashAdapter],
})
export class CommonModule {}
