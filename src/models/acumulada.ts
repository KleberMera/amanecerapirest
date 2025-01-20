export interface AccionAcumuladaDto {
  id?: number;
  usuarioId: number;
  totalAcumulado: number;
  mesAcumulado: string;
  fechaAcumulado: Date;
  estado?: boolean;
  
}
