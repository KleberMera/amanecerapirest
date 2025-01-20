import { Controller } from '@nestjs/common';
import { ResumenAccionesService } from './resumen-acciones.service';

@Controller('resumen-acciones')
export class ResumenAccionesController {
  constructor(private readonly resumenAccionesService: ResumenAccionesService) {}
}
