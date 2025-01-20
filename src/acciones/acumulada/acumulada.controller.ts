import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AcumuladaService } from './acumulada.service';
import { AccionAcumulada, Prisma } from '@prisma/client';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Controller('acumulada')
export class AcumuladaController {
  constructor(private readonly acumuladaService: AcumuladaService) {}

  @Post()
  async create(
    @Body() data: Prisma.AccionAcumuladaCreateInput,
  ): Promise<StandardResponse<AccionAcumulada>> {
    return this.acumuladaService.create(data);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('usuarioId') usuarioId?: number,
    @Query('estado') estado?: boolean,
    @Query('mesAcumulado') mesAcumulado?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ): Promise<StandardResponse<AccionAcumulada[]>> {
    const where: Prisma.AccionAcumuladaWhereInput = {};
    
    // Construimos el objeto where según los parámetros recibidos
    if (usuarioId) where.usuarioId = usuarioId;
    if (estado !== undefined) where.estado = estado;
    if (mesAcumulado) where.mesAcumulado = mesAcumulado;
  
    // Construimos el objeto orderBy
    const orderByObject = orderBy ? {
      fechaAcumulado: orderBy
    } : undefined;
  
    return this.acumuladaService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
      orderBy: orderByObject
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<AccionAcumulada>> {
    return this.acumuladaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.AccionAcumuladaUpdateInput,
  ): Promise<StandardResponse<AccionAcumulada>> {
    return this.acumuladaService.update(id, data);
  }

  @Delete(':id/soft')
  async softDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<AccionAcumulada>> {
    return this.acumuladaService.softDelete(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StandardResponse<AccionAcumulada>> {
    return this.acumuladaService.remove(id);
  }

  @Get('usuario/:usuarioId')
  async findByUsuario(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
  ): Promise<StandardResponse<AccionAcumulada[]>> {
    return this.acumuladaService.findByUsuario(usuarioId);
  }

  @Get('total-mes/:usuarioId/:mes')
  async getTotalAcumuladoPorMes(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('mes') mes: string,
  ): Promise<StandardResponse<number>> {
    return this.acumuladaService.getTotalAcumuladoPorMes(usuarioId, mes);
  }

  @Get('resumen')
  async getResumenPorPeriodo(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('usuarioId') usuarioId?: number,
  ): Promise<StandardResponse<AccionAcumulada[]>> {
    return this.acumuladaService.getResumenPorPeriodo(
      new Date(startDate),
      new Date(endDate),
      usuarioId ? Number(usuarioId) : undefined,
    );
  }
}
