import { Module } from '@nestjs/common';
import { AcumuladaService } from './acumulada.service';
import { AcumuladaController } from './acumulada.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AcumuladaController],
  providers: [AcumuladaService],
})
export class AcumuladaModule {}
