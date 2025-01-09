import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class IdcardService {
  private readonly SRI_API_URL =
    'https://srienlinea.sri.gob.ec/sri-registro-civil-servicio-internet/rest/DatosRegistroCivil';

  constructor(private readonly httpService: HttpService) {}

  async validateIdCard(
    cedula: string,
  ): Promise<{ isValid: boolean; message?: string }> {
    // Validación básica del formato de la cédula
    if (!cedula || !/^\d{10}$/.test(cedula)) {
      throw new HttpException(
        'Formato de cédula inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.SRI_API_URL}/existeNumeroIdentificacion`, {
            params: {
              numeroIdentificacion: cedula,
            },
            timeout: 5000, // 5 segundos de timeout
          })
          .pipe(
            map((res) => res.data),
            catchError(() => {
              throw new HttpException(
                'Error al consultar el servicio del SRI',
                HttpStatus.SERVICE_UNAVAILABLE,
              );
            }),
          ),
      );

      return {
        isValid: response === true,
        message: response === true ? 'Cédula válida' : 'Cédula inválida',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error en la validación de la cédula',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
