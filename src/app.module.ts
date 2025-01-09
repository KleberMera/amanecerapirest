import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdcardModule } from './idcard/idcard.module';

@Module({
  imports: [IdcardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
