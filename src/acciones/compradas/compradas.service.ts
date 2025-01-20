import { Injectable, HttpStatus, Logger } from '@nestjs/common';

import { Prisma, AccionComprada } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Injectable()
export class CompradasService {
  private readonly logger = new Logger(CompradasService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.AccionCompradaCreateInput): Promise<StandardResponse<AccionComprada>> {
    try {
      const result = await this.prismaService.accionComprada.create({
        data,
        
      });
      
      return {
        message: 'Acción comprada registrada exitosamente',
        data: result,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      this.logger.error(`Error al crear acción comprada: ${error.message}`);
      return {
        message: `Error al registrar la acción comprada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.AccionCompradaWhereInput;
    orderBy?: Prisma.AccionCompradaOrderByWithRelationInput;
  }): Promise<StandardResponse<AccionComprada[]>> {
    try {
      const { skip, take, where, orderBy } = params || {};
      const result = await this.prismaService.accionComprada.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          usuario: true,
          interesesGanados: true
        },
      });

      return {
        message: 'Acciones compradas recuperadas exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar acciones compradas: ${error.message}`);
      return {
        message: `Error al recuperar las acciones compradas: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findOne(id: number): Promise<StandardResponse<AccionComprada>> {
    try {
      const result = await this.prismaService.accionComprada.findUnique({
        where: { id },
        include: {
          usuario: true,
          interesesGanados: true
        },
      });

      if (!result) {
        return {
          message: 'Acción comprada no encontrada',
          data: null,
          status: HttpStatus.NOT_FOUND
        };
      }

      return {
        message: 'Acción comprada recuperada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar acción comprada: ${error.message}`);
      return {
        message: `Error al recuperar la acción comprada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async update(id: number, data: Prisma.AccionCompradaUpdateInput): Promise<StandardResponse<AccionComprada>> {
    try {
      const result = await this.prismaService.accionComprada.update({
        where: { id },
        data,
        include: {
          usuario: true,
          interesesGanados: true
        }
      });

      return {
        message: 'Acción comprada actualizada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al actualizar acción comprada: ${error.message}`);
      return {
        message: `Error al actualizar la acción comprada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async softDelete(id: number): Promise<StandardResponse<AccionComprada>> {
    try {
      const result = await this.prismaService.accionComprada.update({
        where: { id },
        data: {
          estado: false,
        },
        include: {
          usuario: true,
          interesesGanados: true
        }
      });

      return {
        message: 'Acción comprada desactivada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al desactivar acción comprada: ${error.message}`);
      return {
        message: `Error al desactivar la acción comprada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async remove(id: number): Promise<StandardResponse<AccionComprada>> {
    try {
      const result = await this.prismaService.accionComprada.delete({
        where: { id },
      });

      return {
        message: 'Acción comprada eliminada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al eliminar acción comprada: ${error.message}`);
      return {
        message: `Error al eliminar la acción comprada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findByUsuario(usuarioId: number): Promise<StandardResponse<AccionComprada[]>> {
    try {
      const result = await this.prismaService.accionComprada.findMany({
        where: {
          usuarioId,
          estado: true,
        },
        include: {
          usuario: true,
          interesesGanados: true
        },
      });

      return {
        message: 'Acciones compradas del usuario recuperadas exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar acciones del usuario: ${error.message}`);
      return {
        message: `Error al recuperar las acciones compradas del usuario: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getTotalCompradoPorMes(usuarioId: number, mes: string): Promise<StandardResponse<number>> {
    try {
      const resultado = await this.prismaService.accionComprada.aggregate({
        where: {
          usuarioId,
          mesCompra: mes,
          estado: true,
        },
        _sum: {
          cantidad: true,
        },
      });

      return {
        message: 'Total de acciones compradas calculado exitosamente',
        data: resultado._sum.cantidad || 0,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al calcular total comprado: ${error.message}`);
      return {
        message: `Error al calcular el total de acciones compradas: ${error.message}`,
        data: 0,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getResumenPorPeriodo(
    startDate: Date,
    endDate: Date,
    usuarioId?: number,
  ): Promise<StandardResponse<AccionComprada[]>> {
    try {
      const result = await this.prismaService.accionComprada.findMany({
        where: {
          fechaCompra: {
            gte: startDate,
            lte: endDate,
          },
          ...(usuarioId && { usuarioId }),
          estado: true,
        },
        include: {
          usuario: true,
          interesesGanados: true
        },
        orderBy: {
          fechaCompra: 'desc',
        },
      });

      return {
        message: 'Resumen de acciones compradas recuperado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar resumen por período: ${error.message}`);
      return {
        message: `Error al recuperar el resumen de acciones compradas: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getTotalInteresesPorAccion(id: number): Promise<StandardResponse<number>> {
    try {
      const intereses = await this.prismaService.interesGanado.aggregate({
        where: {
          accionCompradaId: id
        },
        _sum: {
          interesGenerado: true
        }
      });

      return {
        message: 'Total de intereses calculado exitosamente',
        data: Number(intereses._sum.interesGenerado) || 0,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al calcular total de intereses: ${error.message}`);
      return {
        message: `Error al calcular el total de intereses: ${error.message}`,
        data: 0,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }
}