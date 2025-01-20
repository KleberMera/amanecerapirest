import { Module } from '@nestjs/common';
import { CompradasService } from './compradas.service';
import { CompradasController } from './compradas.controller';

@Module({
  controllers: [CompradasController],
  providers: [CompradasService],
})
export class CompradasModule {}
