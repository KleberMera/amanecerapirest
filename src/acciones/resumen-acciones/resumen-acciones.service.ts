import { Injectable, HttpStatus, Logger } from '@nestjs/common';

import { Prisma, ResumenAccionesUsuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Injectable()
export class ResumenAccionesService {
  private readonly logger = new Logger(ResumenAccionesService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ResumenAccionesUsuarioCreateInput) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.create({
        data,
        include: {
          usuario: true
        }
      });
      
      return {
        message: 'Resumen de acciones creado exitosamente',
        data: result,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      this.logger.error(`Error al crear resumen de acciones: ${error.message}`);
      return {
        message: `Error al crear el resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.ResumenAccionesUsuarioWhereInput;
    orderBy?: Prisma.ResumenAccionesUsuarioOrderByWithRelationInput;
  }) {
    try {
      const { skip, take, where, orderBy } = params || {};
      const result = await this.prismaService.resumenAccionesUsuario.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          usuario: true
        }
      });

      return {
        message: 'Resúmenes de acciones recuperados exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar resúmenes de acciones: ${error.message}`);
      return {
        message: `Error al recuperar los resúmenes de acciones: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.findUnique({
        where: { id },
        include: {
          usuario: true
        }
      });

      if (!result) {
        return {
          message: 'Resumen de acciones no encontrado',
          data: null,
          status: HttpStatus.NOT_FOUND
        };
      }

      return {
        message: 'Resumen de acciones recuperado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar resumen de acciones: ${error.message}`);
      return {
        message: `Error al recuperar el resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async update(id: number, data: Prisma.ResumenAccionesUsuarioUpdateInput) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.update({
        where: { id },
        data,
        include: {
          usuario: true
        }
      });

      return {
        message: 'Resumen de acciones actualizado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al actualizar resumen de acciones: ${error.message}`);
      return {
        message: `Error al actualizar el resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async softDelete(id: number) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.update({
        where: { id },
        data: {
          estado: false
        },
        include: {
          usuario: true
        }
      });

      return {
        message: 'Resumen de acciones desactivado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al desactivar resumen de acciones: ${error.message}`);
      return {
        message: `Error al desactivar el resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.delete({
        where: { id }
      });

      return {
        message: 'Resumen de acciones eliminado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al eliminar resumen de acciones: ${error.message}`);
      return {
        message: `Error al eliminar el resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async findByUsuario(usuarioId: number) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.findMany({
        where: {
          usuarioId,
          estado: true
        },
        include: {
          usuario: true
        },
        orderBy: {
          fechaResumen: 'desc'
        }
      });

      return {
        message: 'Resúmenes de acciones del usuario recuperados exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar resúmenes de acciones del usuario: ${error.message}`);
      return {
        message: `Error al recuperar los resúmenes de acciones del usuario: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async getLatestResumen(usuarioId: number) {
    try {
      const result = await this.prismaService.resumenAccionesUsuario.findFirst({
        where: {
          usuarioId,
          estado: true
        },
        orderBy: {
          fechaResumen: 'desc'
        }
      });

      if (!result) {
        return {
          message: 'No se encontró ningún resumen de acciones para el usuario',
          data: null,
          status: HttpStatus.NOT_FOUND
        };
      }

      return {
        message: 'Último resumen de acciones recuperado exitosamente',
        data: result,
        status: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error al recuperar último resumen de acciones: ${error.message}`);
      return {
        message: `Error al recuperar el último resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }

  async generateResumen(usuarioId: number) {
    try {
      // Obtener total de acciones acumuladas
      const accionesAcumuladas = await this.prismaService.accionAcumulada.aggregate({
        where: {
          usuarioId,
          estado: true
        },
        _sum: {
          totalAcumulado: true
        }
      });

      // Obtener total de acciones compradas
      const accionesCompradas = await this.prismaService.accionComprada.aggregate({
        where: {
          usuarioId,
          estado: true
        },
        _sum: {
          cantidad: true
        }
      });

      // Obtener total de intereses ganados
      const interesesGanados = await this.prismaService.interesGanado.aggregate({
        where: {
          accionComprada: {
            usuarioId,
            estado: true
          },
          estado: true
        },
        _sum: {
          interesGenerado: true
        }
      });

      // Crear nuevo resumen
      const newResumen = await this.prismaService.resumenAccionesUsuario.create({
        data: {
          usuarioId,
          totalAcumulado: accionesAcumuladas._sum.totalAcumulado || 0,
          totalComprado: accionesCompradas._sum.cantidad || 0,
          totalInteresGanado: interesesGanados._sum.interesGenerado || 0,
          fechaResumen: new Date(),
        },

      });

      return {
        message: 'Resumen de acciones generado exitosamente',
        data: newResumen,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      this.logger.error(`Error al generar resumen de acciones: ${error.message}`);
      return {
        message: `Error al generar el resumen de acciones: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }


  async getTotalesPorUsuario(usuarioId: number) {
    try {
      // Total de acciones compradas
      const totalComprado = await this.prismaService.accionComprada.aggregate({
        where: { 
          usuarioId, 
          estado: true 
        },
        _sum: { 
          cantidad: true 
        }
      });
  
      // Total de acciones acumuladas
      const totalAcumulado = await this.prismaService.accionAcumulada.aggregate({
        where: { 
          usuarioId, 
          estado: true 
        },
        _sum: { 
          totalAcumulado: true 
        }
      });
  
      // Total general (suma de compradas + acumuladas)
      const totalGeneral = (totalComprado._sum.cantidad || 0) + (totalAcumulado._sum.totalAcumulado || 0);
  
      return {
        message: 'Totales calculados exitosamente',
        data: {
          totalComprado: totalComprado._sum.cantidad || 0,
          totalAcumulado: totalAcumulado._sum.totalAcumulado || 0,
          totalGeneral: totalGeneral
        },
        status: HttpStatus.OK
      };
  
    } catch (error) {
      this.logger.error(`Error al calcular totales del usuario: ${error.message}`);
      return {
        message: `Error al calcular los totales: ${error.message}`,
        data: {
          totalComprado: 0,
          totalAcumulado: 0,
          totalGeneral: 0
        },
        status: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }
}