export interface Jornada {
  // Generales
  id: null;
  no: number;
  userReg: string;
  userMod: string;
  // Entidad
  fecha: Date;
  empleados: [string];
}
