import { Pago } from "@/interfaces/Pago";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createPagoa = async (pago: Pago): Promise<AxiosResponse> =>
  await axios.post("/pagos/Savea", pago);

// Crear un Solo Registro
export const createPago = async (pago: Pago): Promise<AxiosResponse> =>
  await axios.post("/pagos/Save", pago);

// Leer Todos los registros
export const getPagos = async (): Promise<AxiosResponse<Pago[]>> =>
  await axios.get("/pagos/get");

//Leer un solo Registro por ID
export const getPago = async (id: string): Promise<AxiosResponse<Pago>> =>
  await axios.get(`/pagos/GetById/${id}`);

//Leer el último Registro
export const getOnePago = async (): Promise<AxiosResponse<Pago>> =>
  await axios.get("/pagos/GetOne");

//Actualizar un Registro
export const updatePago = async (
  id: string,
  newPago: Pago
): Promise<AxiosResponse<Pago>> =>
  await axios.put(`/pagos/Update/${id}`, newPago);

//Actualizar todos los Registros

//Eliminar un Registro
export const deletePago = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/pagos/Delete/${id}`);

//Eliminar todos los Registros
export const eliminatePagos = async (pago: Pago): Promise<AxiosResponse> =>
  await axios.post("/pagos/delete", pago);

//Reportes----------------------------------------------------------------------------------------------------
// Obtener Pagos para Nómina
export const getPagosNom = async (): Promise<AxiosResponse> =>
  await axios.get("/pagos/getPagosNom");

// Obtener Pagos por Nómina
export const getPagByNom = async (documento: any): Promise<AxiosResponse> =>
  await axios.post("/pagos/getPagByNom", documento);

// Get Pagos Agrupadas por Estatus
export const getpagosCant = async (): Promise<AxiosResponse<Pago[]>> =>
  await axios.get("/pagos/getGpedByStat");

// Get Pagos Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Pago[]>> =>
  await axios.get("/pagos/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (pago: Pago): Promise<AxiosResponse> =>
  await axios.post("/pagos/updateOne", pago);

//Marcar Pagos en Nómina
export const servAsigPago = async (documento: any): Promise<AxiosResponse> =>
  await axios.post("/pagos/asigPago", documento);
