import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { encrypt } from 'src/libs/bcrypt';
import { UserDTO } from 'src/models/user';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDTO) {
    try {
      const userData = await this.prismaService.user.findUnique({
        where: {
          user: user.user,
        },
      });

      if (!userData) {
        throw new BadRequestException('Usuario o contraseña invalidos');
      }

      const isPasswordMatch = await compare(user.password, userData.password);

      if (!isPasswordMatch) {
        throw new BadRequestException('Usuario o contraseña invalidos');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, createdAt, updatedAt, ...userWithoutPassword } =
        userData;
      const payload = {
        ...{ userWithoutPassword, createdAt, updatedAt },
      };

      const access_token = await this.jwtService.signAsync(payload);

      return {
        message: 'Usuario autenticado con éxito',
        data: userWithoutPassword,
        access_token: access_token,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error al autenticar el usuario: ${error.message}`);
    }
  }

  async signUp(user: UserDTO) {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          OR: [
            { user: user.user },
            { username: user.username },
            { email: user.email },
          ],
        },
      });

      if (existingUser) throw new BadRequestException('El usuario ya existe');

      const hashedPassword = await encrypt(user.password);

      const newUser = await this.prismaService.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, createdAt, updatedAt, ...userWithoutPassword } =
        newUser;

      return {
        message: 'Usuario creado con éxito',
        data: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error al registrar el usuario: ${error.message}`);
    }
  }

  // Obtener todos los usuarios
  async getUser() {
    const users = await this.prismaService.user.findMany();
    return {
      message: 'Usuarios obtenidos con éxito',
      data: users,
    };
  }

  // Obtener un usuario por ID
  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return {
      message: 'Usuario obtenido con éxito',
      data: user,
    };
  }
}
