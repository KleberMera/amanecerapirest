import { Controller, Get, Param } from '@nestjs/common';
import { IdcardService } from './idcard.service';

@Controller('idcard')
export class IdcardController {
  constructor(private readonly idcardService: IdcardService) {}

  @Get('validate/:cedula')
  async validateIdCard(@Param('cedula') cedula: string) {
    return this.idcardService.validateIdCard(cedula);
  }
}
