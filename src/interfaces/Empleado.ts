export interface Empleado {
  // Generales
  id: null;
  no: number;
  userReg: string;
  userMod: string;
  status: String;
  // Entidad
  cedula: string;
  nombre: string;
  funcion: string;
  modalidad: string;
  sueldo: number;
  metodoPago: string;
  cuenta: string;
  codigoPonchador: string;
  productionIncome: Boolean;
  workingDayIncome: Boolean;
  workingDayValueIncome: number;
  salaryIncome: Boolean;
  salaryAmountIncome: number;
  tssOutcome: Boolean;
  extraSFSOutcome: Boolean;
  extraSFSValueOutcome: number;
  loanOutcome: Boolean;
}
