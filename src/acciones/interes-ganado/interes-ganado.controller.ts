import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InteresGanadoService } from './interes-ganado.service';
import { InteresGanado, Prisma } from '@prisma/client';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Controller('interes-ganado')
export class InteresGanadoController {
  constructor(private readonly interesGanadoService: InteresGanadoService) {}

  @Post()
  async create(@Body() data: Prisma.InteresGanadoCreateInput) {
    const response = await this.interesGanadoService.create(data);
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

    const response = await this.interesGanadoService.findAll(params);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.interesGanadoService.findOne(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.InteresGanadoUpdateInput,
  ) {
    const response = await this.interesGanadoService.update(id, data);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    const response = await this.interesGanadoService.softDelete(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.interesGanadoService.remove(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get('by-usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const response = await this.interesGanadoService.findByUsuario(usuarioId);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get('total-usuario/:usuarioId')
  async getTotalInteresesByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const response = await this.interesGanadoService.getTotalInteresesByUsuario(usuarioId);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

}
