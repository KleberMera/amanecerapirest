import { Controller } from '@nestjs/common';
import { AcumuladaService } from './acumulada.service';

@Controller('acumulada')
export class AcumuladaController {
  constructor(private readonly acumuladaService: AcumuladaService) {}
}
