export interface Prestamo {
  // Generales
  id: null;
  no: number;
  userReg: string;
  userMod: string;
  // Entidad
  fecha: Date;
  empleados: [Object];
  empleado: string;
  monto: number;
  cuotas: number;
  montoCuotas: number;
}
