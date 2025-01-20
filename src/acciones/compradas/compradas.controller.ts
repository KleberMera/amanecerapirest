import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompradasService } from './compradas.service';
import { Prisma, AccionComprada } from '@prisma/client';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Controller('compradas')
export class CompradasController {
  constructor(private readonly compradasService: CompradasService) {}

  @Post()
  async create(
    @Body() data: Prisma.AccionCompradaCreateInput,
  ): Promise<StandardResponse<AccionComprada>> {
    return this.compradasService.create(data);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('usuarioId') usuarioId?: number,
    @Query('estado') estado?: boolean,
    @Query('mesCompra') mesCompra?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<StandardResponse<AccionComprada[]>> {
    const where: Prisma.AccionCompradaWhereInput = {};

    if (usuarioId) where.usuarioId = Number(usuarioId);
    if (estado !== undefined) where.estado = estado;
    if (mesCompra) where.mesCompra = mesCompra;

    const orderByObject = orderBy
      ? {
          fechaCompra: orderBy,
        }
      : undefined;

    return this.compradasService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
      orderBy: orderByObject,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<AccionComprada>> {
    return this.compradasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.AccionCompradaUpdateInput,
  ): Promise<StandardResponse<AccionComprada>> {
    return this.compradasService.update(id, data);
  }

  @Delete(':id/soft')
  async softDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<AccionComprada>> {
    return this.compradasService.softDelete(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<AccionComprada>> {
    return this.compradasService.remove(id);
  }

  @Get('usuario/:usuarioId')
  async findByUsuario(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
  ): Promise<StandardResponse<AccionComprada[]>> {
    return this.compradasService.findByUsuario(usuarioId);
  }

  @Get('total-mes/:usuarioId/:mes')
  async getTotalCompradoPorMes(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('mes') mes: string,
  ): Promise<StandardResponse<number>> {
    return this.compradasService.getTotalCompradoPorMes(usuarioId, mes);
  }

  @Get('resumen/periodo')
  async getResumenPorPeriodo(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('usuarioId') usuarioId?: string,
  ): Promise<StandardResponse<AccionComprada[]>> {
    return this.compradasService.getResumenPorPeriodo(
      new Date(startDate),
      new Date(endDate),
      usuarioId ? Number(usuarioId) : undefined,
    );
  }

  @Get('intereses/:id')
  async getTotalInteresesPorAccion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<number>> {
    return this.compradasService.getTotalInteresesPorAccion(id);
  }
}
