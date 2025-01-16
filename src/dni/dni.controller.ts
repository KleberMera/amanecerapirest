import { Controller, Get, Param } from '@nestjs/common';
import { DniService } from './dni.service';


@Controller('dni')
export class IdcardController {
  constructor(private readonly _dniService: DniService) {}

  @Get('validate/:cedula')
  async validateIdCard(@Param('cedula') cedula: string) {
    return this._dniService.validateIdCard(cedula);
  }


  @Get('person/:cedula')
  async getPersonData(@Param('cedula') cedula: string) {
    return this._dniService.getPersonData(cedula);
  }
}
