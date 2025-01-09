import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
interface SriResponse {
  contribuyente: {
    identificacion: string;
    denominacion: string | null;
    tipo: string | null;
    clase: string;
    tipoIdentificacion: string;
    resolucion: string | null;
    nombreComercial: string;
    direccionMatriz: string | null;
    fechaInformacion: number;
    mensaje: string | null;
    estado: string | null;
  };
  deuda: any | null;
  impugnacion: any | null;
  remision: any | null;
}

export interface PersonResponse extends SriResponse {
  nombres: string;
  apellidos: string;
}

@Injectable()
export class IdcardService {
  private readonly SRI_API_URL =
    'https://srienlinea.sri.gob.ec/sri-registro-civil-servicio-internet/rest/DatosRegistroCivil';
  private readonly SRI_API_URL_DNI =
    'https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/';
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

  async getPersonData(cedula: string) {
    try {
      const timestamp = new Date().getTime();
      const response = await firstValueFrom(
        this.httpService.get(`${this.SRI_API_URL_DNI}${cedula}`, {
          params: {
            tipoPersona: 'N',
            _: timestamp,
          },
        }),
      );

      // Si hay nombreComercial, separamos nombres y apellidos
      const nameInfo = response.data.contribuyente.nombreComercial
        ? this.splitFullName(response.data.contribuyente.nombreComercial)
        : { nombres: '', apellidos: '' };

      return {
        ...response.data,
        nombres: nameInfo.nombres,
        apellidos: nameInfo.apellidos,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error en la consulta de datos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private splitFullName(nombreComercial: string): {
    nombres: string;
    apellidos: string;
  } {
    const parts = nombreComercial.split(' ');
    const nombres = parts.slice(-2).join(' ');
    const apellidos = parts.slice(0, -2).join(' ');

    return { nombres, apellidos };
  }
}
