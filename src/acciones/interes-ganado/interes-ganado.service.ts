import { Injectable, HttpStatus, Logger } from '@nestjs/common';

import { Prisma, InteresGanado } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Injectable()
export class InteresGanadoService {
  private readonly logger = new Logger(InteresGanadoService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.InteresGanadoCreateInput): Promise<StandardResponse<InteresGanado>> {
    try {
      const result = await this.prismaService.interesGanado.create({
        data,
        include: {
          accionComprada: true
        }
      });
      
      return {
        message: 'Interés ganado registrado exitosamente',
        data: result,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      this.logger.error(`Error al crear interés ganado: ${error.message}`);
      return {
        message: `Error al registrar el interés ganado: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.InteresGanadoWhereInput;
    orderBy?: Prisma.InteresGanadoOrderByWithRelationInput;
  }): Promise<StandardResponse<InteresGanado[]>> {
    try {
      const { skip, take, where, orderBy } = params || {};
      const result = await this.prismaService.interesGanado.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          accionComprada: true
        }
      });

      return {
        message: 'Intereses ganados recuperados exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar intereses ganados: ${error.message}`);
      return {
        message: `Error al recuperar los intereses ganados: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findOne(id: number): Promise<StandardResponse<InteresGanado>> {
    try {
      const result = await this.prismaService.interesGanado.findUnique({
        where: { id },
        include: {
          accionComprada: true
        }
      });

      if (!result) {
        return {
          message: 'Interés ganado no encontrado',
          data: null,
          status: HttpStatus.NOT_FOUND
        };
      }

      return {
        message: 'Interés ganado recuperado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar interés ganado: ${error.message}`);
      return {
        message: `Error al recuperar el interés ganado: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async update(id: number, data: Prisma.InteresGanadoUpdateInput): Promise<StandardResponse<InteresGanado>> {
    try {
      const result = await this.prismaService.interesGanado.update({
        where: { id },
        data,
        include: {
          accionComprada: true
        }
      });

      return {
        message: 'Interés ganado actualizado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al actualizar interés ganado: ${error.message}`);
      return {
        message: `Error al actualizar el interés ganado: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async softDelete(id: number): Promise<StandardResponse<InteresGanado>> {
    try {
      const result = await this.prismaService.interesGanado.update({
        where: { id },
        data: {
          estado: false
        },
        include: {
          accionComprada: true
        }
      });

      return {
        message: 'Interés ganado desactivado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al desactivar interés ganado: ${error.message}`);
      return {
        message: `Error al desactivar el interés ganado: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async remove(id: number): Promise<StandardResponse<InteresGanado>> {
    try {
      const result = await this.prismaService.interesGanado.delete({
        where: { id }
      });

      return {
        message: 'Interés ganado eliminado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al eliminar interés ganado: ${error.message}`);
      return {
        message: `Error al eliminar el interés ganado: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findByAccionComprada(accionCompradaId: number): Promise<StandardResponse<InteresGanado[]>> {
    try {
      const result = await this.prismaService.interesGanado.findMany({
        where: {
          accionCompradaId,
          estado: true
        },
        include: {
          accionComprada: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return {
        message: 'Intereses de la acción comprada recuperados exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar intereses de la acción: ${error.message}`);
      return {
        message: `Error al recuperar los intereses de la acción: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getTotalIntereses(accionCompradaId: number): Promise<StandardResponse<number>> {
    try {
      const resultado = await this.prismaService.interesGanado.aggregate({
        where: {
          accionCompradaId,
          estado: true
        },
        _sum: {
          interesGenerado: true
        }
      });

      return {
        message: 'Total de intereses calculado exitosamente',
        data: Number(resultado._sum.interesGenerado) || 0,
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