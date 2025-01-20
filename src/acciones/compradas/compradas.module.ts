import { Module } from '@nestjs/common';
import { CompradasService } from './compradas.service';
import { CompradasController } from './compradas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompradasController],
  providers: [CompradasService],
})
export class CompradasModule {}
