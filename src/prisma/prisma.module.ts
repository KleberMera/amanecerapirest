import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  //  controllers: [PrismaController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
