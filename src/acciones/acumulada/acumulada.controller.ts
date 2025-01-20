import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AcumuladaService } from './acumulada.service';

// Interfaz para los datos de crear o actualizar
interface AccionAcumuladaDto {
  usuarioId: number;
  totalAcumulado: number;
  mesAcumulado: string;
  fechaAcumulado: Date;
  activo?: boolean;
}

@Controller('acumulada')
export class AcumuladaController {
  constructor(private readonly acumuladaService: AcumuladaService) {}

  // Crear una nueva acción acumulada
  @Post()
  async crearAccionAcumulada(@Body() data: AccionAcumuladaDto) {
    const response = await this.acumuladaService.crearAccionAcumulada(data);
    if (response.status === 'error') {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  // Obtener todas las acciones acumuladas
  @Get()
  async obtenerAccionesAcumuladas() {
    const response = await this.acumuladaService.obtenerAccionesAcumuladas();
    if (response.status === 'error') {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  // Obtener una acción acumulada por ID
  @Get(':id')
  async obtenerAccionAcumuladaPorId(@Param('id') id: number) {
    const response = await this.acumuladaService.obtenerAccionAcumuladaPorId(
      Number(id),
    );
    if (response.status === 'error') {
      throw new HttpException(response.message, HttpStatus.NOT_FOUND);
    }
    return response;
  }

  // Actualizar una acción acumulada por ID
  @Patch(':id')
  async actualizarAccionAcumulada(
    @Param('id') id: number,
    @Body() data: Partial<AccionAcumuladaDto>,
  ) {
    const response = await this.acumuladaService.actualizarAccionAcumulada(
      Number(id),
      data,
    );
    if (response.status === 'error') {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  // Eliminar una acción acumulada (lógica)
  @Delete(':id')
  async eliminarAccionAcumulada(@Param('id') id: number) {
    const response = await this.acumuladaService.eliminarAccionAcumulada(
      Number(id),
    );
    if (response.status === 'error') {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  @Get('usuario/:usuarioId')
  async obtenerAccionesPorUsuario(@Param('usuarioId') usuarioId: number) {
    
    return this.acumuladaService.obtenerAccionesAcumuladasPorUsuario(Number(usuarioId));
  }
}
