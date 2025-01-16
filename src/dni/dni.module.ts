import { Module } from '@nestjs/common';

import { IdcardController } from './dni.controller';
import { HttpModule } from '@nestjs/axios';
import { DniService } from './dni.service';

@Module({
  imports: [HttpModule],
  controllers: [IdcardController],
  providers: [DniService],
})
export class DniModule {}
