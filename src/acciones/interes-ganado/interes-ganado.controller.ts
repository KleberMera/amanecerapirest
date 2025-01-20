import { Controller } from '@nestjs/common';
import { InteresGanadoService } from './interes-ganado.service';

@Controller('interes-ganado')
export class InteresGanadoController {
  constructor(private readonly interesGanadoService: InteresGanadoService) {}
}
