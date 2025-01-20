import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InteresGanadoService } from './interes-ganado.service';
import { InteresGanado, Prisma } from '@prisma/client';

interface StandardResponse<T> {
  message: string;
  data: T;
  status: HttpStatus;
}

@Controller('interes-ganado')
export class InteresGanadoController {
  constructor(private readonly interesGanadoService: InteresGanadoService) {}

  


}
