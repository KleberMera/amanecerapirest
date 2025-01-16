import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DniModule } from './dni/dni.module';


@Module({
  imports: [DniModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
