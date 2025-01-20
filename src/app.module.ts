import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DniModule } from './dni/dni.module';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AcumuladaModule } from './acciones/acumulada/acumulada.module';

@Module({
  imports: [PrismaModule, DniModule, AuthModule, AcumuladaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
