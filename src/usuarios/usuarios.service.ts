import { Injectable, HttpStatus, Logger } from '@nestjs/common';

import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);
  constructor(private readonly prismaService: PrismaService) {}

  // Listar todos los usuarios
  async findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput;
  }) {
    try {
      const { skip, take, orderBy } = params || {};
      const usuarios = await this.prismaService.usuario.findMany({
        skip,
        take,
        orderBy,
        where: {
          estado: true,
        },
        include: {
          rol: true,
          accionesAcumuladas: true,
          accionesCompradas: true,
          resumenAcciones: true,
        },
      });

      return {
        message: 'Usuarios recuperados exitosamente',
        data: usuarios,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(`Error al recuperar usuarios: ${error.message}`);
      return {
        message: `Error al recuperar usuarios: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAllUser() {
    const usuarios = await this.prismaService.usuario.findMany({
      include: {
        rol: true,
      },
    });

    return {
      message: 'Usuarios recuperados exitosamente',
      data: usuarios,
      status: HttpStatus.OK,
    };
  }

  // Buscar usuarios por nombre o apellido
  async findByName(searchTerm: string) {
    try {
      const usuarios = await this.prismaService.usuario.findMany({
        where: {
          OR: [
            {
              nombre: {
                contains: searchTerm,
                mode: 'insensitive', // Búsqueda case-insensitive
              },
            },
            {
              apellido: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              nombreComercial: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
          AND: {
            estado: true,
          },
        },
        include: {
          rol: true,
        },
      });

      return {
        message: 'Usuarios encontrados exitosamente',
        data: usuarios,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(
        `Error al buscar usuarios por nombre: ${error.message}`,
      );
      return {
        message: `Error al buscar usuarios: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // Buscar usuario por ID
  async findById(id: number) {
    try {
      const usuario = await this.prismaService.usuario.findUnique({
        where: {
          id,
          estado: true,
        },
        include: {
          rol: true,
        },
      });

      if (!usuario) {
        return {
          message: 'Usuario no encontrado',
          data: null,
          status: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: 'Usuario encontrado exitosamente',
        data: usuario,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(`Error al buscar usuario por ID: ${error.message}`);
      return {
        message: `Error al buscar usuario: ${error.message}`,
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // Buscar usuarios por cédula
  async findByCedula(cedula: string) {
    try {
      const usuarios = await this.prismaService.usuario.findMany({
        where: {
          username: {
            // Asumiendo que username se usa para la cédula
            contains: cedula,
            mode: 'insensitive',
          },
          estado: true,
        },
        include: {
          rol: true,
        },
      });

      if (usuarios.length === 0) {
        return {
          message: 'No se encontraron usuarios con esa cédula',
          data: [],
          status: HttpStatus.OK,
        };
      }

      return {
        message: 'Usuarios encontrados exitosamente',
        data: usuarios,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(
        `Error al buscar usuarios por cédula: ${error.message}`,
      );
      return {
        message: `Error al buscar usuarios: ${error.message}`,
        data: [],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // Método auxiliar para validar si existe un usuario
  async checkIfExists(id: number): Promise<boolean> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id },
    });
    return !!usuario;
  }
}
