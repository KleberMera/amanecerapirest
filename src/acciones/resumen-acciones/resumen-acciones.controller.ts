import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ResumenAccionesService } from './resumen-acciones.service';
import { Prisma } from '@prisma/client';

@Controller('resumen-acciones')
export class ResumenAccionesController {
  constructor(private readonly resumenAccionesService: ResumenAccionesService) {}

  @Post()
  async create(@Body() data: Prisma.ResumenAccionesUsuarioCreateInput) {
    const response = await this.resumenAccionesService.create(data);
    if (response.status !== HttpStatus.CREATED) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const params: any = {};
    
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);
    if (where) params.where = JSON.parse(where);
    if (orderBy) params.orderBy = JSON.parse(orderBy);

    const response = await this.resumenAccionesService.findAll(params);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.resumenAccionesService.findOne(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.ResumenAccionesUsuarioUpdateInput,
  ) {
    const response = await this.resumenAccionesService.update(id, data);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    const response = await this.resumenAccionesService.softDelete(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.resumenAccionesService.remove(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const response = await this.resumenAccionesService.findByUsuario(usuarioId);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get('usuario/:usuarioId/ultimo')
  async getLatestResumen(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const response = await this.resumenAccionesService.getLatestResumen(usuarioId);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Post('usuario/:usuarioId/generar')
  async generateResumen(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const response = await this.resumenAccionesService.generateResumen(usuarioId);
    if (response.status !== HttpStatus.CREATED) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }
}
