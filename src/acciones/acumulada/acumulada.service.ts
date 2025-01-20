import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { AccionAcumuladaDto } from 'src/models/acumulada';
import { Response } from 'src/models/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AcumuladaService {
  constructor(private readonly prismaService: PrismaService) {}

  // Crear una nueva acción acumulada
  async crearAccionAcumulada(data: AccionAcumuladaDto) {
    try {
      const accionAcumulada = await this.prismaService.accionAcumulada.create({
        data,
      });
      return {
        status: 'success',
        message: 'Acción acumulada creada exitosamente',
        data: accionAcumulada,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al crear la acción acumulada',
        data: null,
      };
    }
  }

  // Obtener todas las acciones acumuladas
  async obtenerAccionesAcumuladas() {
    try {
      const accionesAcumuladas =
        await this.prismaService.accionAcumulada.findMany();
      return {
        status: 'success',
        message: 'Acciones acumuladas obtenidas exitosamente',
        data: accionesAcumuladas,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al obtener las acciones acumuladas',
        data: null,
      };
    }
  }

  // Obtener una acción acumulada por ID
  async obtenerAccionAcumuladaPorId(
    id: number,
  ): Promise<Response<AccionAcumuladaDto>> {
    try {
      const accionAcumulada =
        await this.prismaService.accionAcumulada.findUnique({
          where: { id },
        });
      if (!accionAcumulada) {
        return {
          status: 'error',
          message: `Acción acumulada con ID ${id} no encontrada`,
          data: null,
        };
      }
      return {
        status: 'success',
        message: 'Acción acumulada obtenida exitosamente',
        data: accionAcumulada,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al obtener la acción acumulada',
        data: null,
      };
    }
  }

  async obtenerAccionesAcumuladasPorUsuario(usuarioId: number) {
    log(usuarioId);
    try {
      const acciones = await this.prismaService.accionAcumulada.findMany({
        where: { usuarioId },
      });
      log(acciones);
      if (!acciones.length) {
        return {
          status: 'error',
          message: 'No se encontraron acciones acumuladas para este usuario.',
          data: null,
        };
      }

      return {
        status: 'success',
        message: 'Acciones acumuladas obtenidas con éxito.',
        data: acciones,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status: 'error',
        message: 'Ocurrió un error al obtener las acciones acumuladas.',
        data: null,
      };
    }
  }

  // Actualizar una acción acumulada por ID
  async actualizarAccionAcumulada(
    id: number,
    data: Partial<AccionAcumuladaDto>,
  ) {
    try {
      const accionAcumulada = await this.prismaService.accionAcumulada.update({
        where: { id },
        data,
      });
      return {
        status: 'success',
        message: 'Acción acumulada actualizada exitosamente',
        data: accionAcumulada,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al actualizar la acción acumulada',
        data: null,
      };
    }
  }

  // Eliminar una acción acumulada (lógica)
  async eliminarAccionAcumulada(id: number) {
    try {
      const accionAcumulada = await this.prismaService.accionAcumulada.update({
        where: { id },
        data: { estado: false },
      });
      return {
        status: 'success',
        message: 'Acción acumulada eliminada exitosamente',
        data: accionAcumulada,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status: 'error',
        message: 'Error al eliminar la acción acumulada',
        data: null,
      };
    }
  }
}
