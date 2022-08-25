import { Cxp } from "@/interfaces/Cxp";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createCxpa = async (cxp: Cxp): Promise<AxiosResponse> =>
  await axios.post("/cxps/Savea", cxp);

// Crear un Solo Registro
export const createCxp = async (cxp: Cxp): Promise<AxiosResponse> =>
  await axios.post("/cxps/Save", cxp);

// Leer Todos los registros
export const getCxps = async (criterio: any): Promise<AxiosResponse<Cxp[]>> =>
  await axios.post("/cxps/get", criterio);

// Leer Todos los registros
export const getCxpsTwo = async (criterio: any): Promise<AxiosResponse<Cxp[]>> =>
  await axios.post("/cxps/gettwo", criterio);

//Leer un solo Registro por ID
export const getCxp = async (id: string): Promise<AxiosResponse<Cxp>> =>
  await axios.get(`/cxps/GetById/${id}`);

//Leer el último Registro
export const getOneCxp = async (): Promise<AxiosResponse<Cxp>> =>
  await axios.get("/cxps/GetOne");

//Actualizar un Registro
export const updateCxp = async (
  id: string,
  newCxp: Cxp
): Promise<AxiosResponse<Cxp>> => await axios.put(`/cxps/Update/${id}`, newCxp);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteCxp = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/cxps/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateCxps = async (cxp: Cxp): Promise<AxiosResponse> =>
  await axios.post("/cxps/delete", cxp);

//Reportes----------------------------------------------------------------------------------------------------
// Obtener Cxp por Pago
export const getCxpByPag = async (documento: any): Promise<AxiosResponse> =>
  await axios.post("/cxps/getCxpByPagGrped", documento);

// Get Cxps Agrupadas por Estatus
export const getcxpsCant = async (): Promise<AxiosResponse<Cxp[]>> =>
  await axios.get("/cxps/getGpedByStat");

// Get Cxps Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Cxp[]>> =>
  await axios.get("/cxps/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------

//Marcar Cuentas en Pago
export const servEnPago = async (documento: any): Promise<AxiosResponse> =>
  await axios.post("/cxps/enPago", documento);

//Seleccionar Cuentas para Pago
export const servParaPago = async (documento: any): Promise<AxiosResponse> =>
  await axios.post("/cxps/paraPago", documento);

//Seleccionar Cuentas para Pago
export const GetPrepagos = async (): Promise<AxiosResponse> =>
  await axios.get("/cxps/getprepagos");

//Actualizar Un Registro
export const updateOne = async (cxp: Cxp): Promise<AxiosResponse> =>
  await axios.post("/cxps/updateOne", cxp);
