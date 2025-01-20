import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DniModule } from './dni/dni.module';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AcumuladaModule } from './acciones/acumulada/acumulada.module';
import { CompradasModule } from './acciones/compradas/compradas.module';
import { InteresGanadoModule } from './acciones/interes-ganado/interes-ganado.module';
import { ResumenAccionesModule } from './acciones/resumen-acciones/resumen-acciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [PrismaModule, DniModule, AuthModule, AcumuladaModule, CompradasModule, InteresGanadoModule, ResumenAccionesModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
