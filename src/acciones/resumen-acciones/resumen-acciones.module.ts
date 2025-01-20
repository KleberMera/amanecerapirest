import { Module } from '@nestjs/common';
import { ResumenAccionesService } from './resumen-acciones.service';
import { ResumenAccionesController } from './resumen-acciones.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResumenAccionesController],
  providers: [ResumenAccionesService],
})
export class ResumenAccionesModule {}
