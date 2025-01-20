import { Controller, Get, Query, Param, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string
  ) {
    const params: any = {};
    
    if (skip) params.skip = parseInt(skip);
    if (take) params.take = parseInt(take);
    if (orderBy) params.orderBy = JSON.parse(orderBy);

    const response = await this.usuariosService.findAll(params);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get('search/name')
  async findByName(@Query('term') searchTerm: string) {
    const response = await this.usuariosService.findByName(searchTerm);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get('search/cedula')
  async findByCedula(@Query('cedula') cedula: string) {
    const response = await this.usuariosService.findByCedula(cedula);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.usuariosService.findById(id);
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(response.message, response.status);
    }
    return response;
  }
}