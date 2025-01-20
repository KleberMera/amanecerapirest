import { Module } from '@nestjs/common';
import { ResumenAccionesService } from './resumen-acciones.service';
import { ResumenAccionesController } from './resumen-acciones.controller';

@Module({
  controllers: [ResumenAccionesController],
  providers: [ResumenAccionesService],
})
export class ResumenAccionesModule {}
