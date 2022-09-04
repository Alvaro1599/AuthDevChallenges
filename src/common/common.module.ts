import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashAdapter } from './hash/hash.adapter';
import { MapperService } from './mappers/mappers.service';
@Module({
  imports: [ConfigModule],
  providers: [HashAdapter, MapperService],
  exports: [HashAdapter, MapperService],
})
export class CommonModule {}
