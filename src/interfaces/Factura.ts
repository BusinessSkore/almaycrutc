export interface Factura {
  id: null;
  no: number;
  idfact: string;
  id_ars: string;
  nom: string;
  nro_autorizacion_salida: string;
  fecha_ingreso: Date;
  numero_afiliado: string;
  rnc: string;
  tipo_factura: string;
  cobertura: number;
  total_servicio: number;
  status: string;
  actividad: [object];
}
