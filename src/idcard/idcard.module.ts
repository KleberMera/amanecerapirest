import { Module } from '@nestjs/common';
import { IdcardService } from './idcard.service';
import { IdcardController } from './idcard.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IdcardController],
  providers: [IdcardService],
})
export class IdcardModule {}
