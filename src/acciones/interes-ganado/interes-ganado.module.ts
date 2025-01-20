import { Module } from '@nestjs/common';
import { InteresGanadoService } from './interes-ganado.service';
import { InteresGanadoController } from './interes-ganado.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InteresGanadoController],
  providers: [InteresGanadoService],
})
export class InteresGanadoModule {}
