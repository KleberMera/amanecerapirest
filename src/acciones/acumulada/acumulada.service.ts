import { Injectable, HttpStatus, Logger } from '@nestjs/common';

import { Prisma, AccionAcumulada } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Injectable()
export class AcumuladaService {
  private readonly logger = new Logger(AcumuladaService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.AccionAcumuladaCreateInput): Promise<StandardResponse<AccionAcumulada>> {
    try {
      const result = await this.prismaService.accionAcumulada.create({
        data,
      });
      
      return {
        message: 'Acción acumulada creada exitosamente',
        data: result,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      this.logger.error(`Error al crear acción acumulada: ${error.message}`);
      return {
        message: `Error al crear la acción acumulada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.AccionAcumuladaWhereInput;
    orderBy?: Prisma.AccionAcumuladaOrderByWithRelationInput;
  }): Promise<StandardResponse<AccionAcumulada[]>> {
    try {
      const { skip, take, where, orderBy } = params || {};
      const result = await this.prismaService.accionAcumulada.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          usuario: true,
        },
      });

      return {
        message: 'Acciones acumuladas recuperadas exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar acciones acumuladas: ${error.message}`);
      return {
        message: `Error al recuperar las acciones acumuladas: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findOne(id: number): Promise<StandardResponse<AccionAcumulada>> {
    try {
      const result = await this.prismaService.accionAcumulada.findUnique({
        where: { id },
        include: {
          usuario: true,
        },
      });

      if (!result) {
        return {
          message: 'Acción acumulada no encontrada',
          data: null,
          status: HttpStatus.NOT_FOUND
        };
      }

      return {
        message: 'Acción acumulada recuperada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar acción acumulada: ${error.message}`);
      return {
        message: `Error al recuperar la acción acumulada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async update(id: number, data: Prisma.AccionAcumuladaUpdateInput): Promise<StandardResponse<AccionAcumulada>> {
    try {
      const result = await this.prismaService.accionAcumulada.update({
        where: { id },
        data,
      });

      return {
        message: 'Acción acumulada actualizada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al actualizar acción acumulada: ${error.message}`);
      return {
        message: `Error al actualizar la acción acumulada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async softDelete(id: number): Promise<StandardResponse<AccionAcumulada>> {
    try {
      const result = await this.prismaService.accionAcumulada.update({
        where: { id },
        data: {
          estado: false,
        },
      });

      return {
        message: 'Acción acumulada desactivada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al desactivar acción acumulada: ${error.message}`);
      return {
        message: `Error al desactivar la acción acumulada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async remove(id: number): Promise<StandardResponse<AccionAcumulada>> {
    try {
      const result = await this.prismaService.accionAcumulada.delete({
        where: { id },
      });

      return {
        message: 'Acción acumulada eliminada exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al eliminar acción acumulada: ${error.message}`);
      return {
        message: `Error al eliminar la acción acumulada: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findByUsuario(usuarioId: number): Promise<StandardResponse<AccionAcumulada[]>> {
    try {
      const result = await this.prismaService.accionAcumulada.findMany({
        where: {
          usuarioId,
          estado: true,
        },
      });

      return {
        message: 'Acciones acumuladas del usuario recuperadas exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar acciones del usuario: ${error.message}`);
      return {
        message: `Error al recuperar las acciones acumuladas del usuario: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getTotalAcumuladoPorMes(usuarioId: number, mes: string): Promise<StandardResponse<number>> {
    try {
      const resultado = await this.prismaService.accionAcumulada.aggregate({
        where: {
          usuarioId,
          mesAcumulado: mes,
          estado: true,
        },
        _sum: {
          totalAcumulado: true,
        },
      });

      return {
        message: 'Total acumulado calculado exitosamente',
        data: resultado._sum.totalAcumulado || 0,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al calcular total acumulado: ${error.message}`);
      return {
        message: `Error al calcular el total acumulado: ${error.message}`,
        data: 0,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getResumenPorPeriodo(
    startDate: Date,
    endDate: Date,
    usuarioId?: number,
  ): Promise<StandardResponse<AccionAcumulada[]>> {
    try {
      const result = await this.prismaService.accionAcumulada.findMany({
        where: {
          fechaAcumulado: {
            gte: startDate,
            lte: endDate,
          },
          ...(usuarioId && { usuarioId }),
          estado: true,
        },
        include: {
          usuario: true,
        },
        orderBy: {
          fechaAcumulado: 'desc',
        },
      });

      return {
        message: 'Resumen de acciones acumuladas recuperado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar resumen por período: ${error.message}`);
      return {
        message: `Error al recuperar el resumen de acciones acumuladas: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }
}