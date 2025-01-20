import { Module } from '@nestjs/common';
import { InteresGanadoService } from './interes-ganado.service';
import { InteresGanadoController } from './interes-ganado.controller';

@Module({
  controllers: [InteresGanadoController],
  providers: [InteresGanadoService],
})
export class InteresGanadoModule {}
