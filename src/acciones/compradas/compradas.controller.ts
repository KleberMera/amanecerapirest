import { Controller } from '@nestjs/common';
import { CompradasService } from './compradas.service';

@Controller('compradas')
export class CompradasController {
  constructor(private readonly compradasService: CompradasService) {}
}
