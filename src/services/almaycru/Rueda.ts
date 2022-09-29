import { Rueda } from "@/interfaces/Rueda";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createRuedaa = async (rueda: Rueda): Promise<AxiosResponse> =>
  await axios.post("/ruedas/Savea", rueda);

// Crear un Solo Registro
export const createRueda = async (rueda: Rueda): Promise<AxiosResponse> =>
  await axios.post("/ruedas/Save", rueda);

// Leer Todos los registros
export const getRuedas = async (): Promise<AxiosResponse<Rueda[]>> =>
  await axios.get("/ruedas/get");

//Leer un solo Registro por ID
export const getRueda = async (id: string): Promise<AxiosResponse<Rueda>> =>
  await axios.get(`/ruedas/GetById/${id}`);

//Leer el último Registro
export const getOneRueda = async (): Promise<AxiosResponse<Rueda>> =>
  await axios.get("/ruedas/GetOne");

//Actualizar un Registro
export const updateRueda = async (
  id: string,
  newRueda: Rueda
): Promise<AxiosResponse<Rueda>> =>
  await axios.put(`/ruedas/Update/${id}`, newRueda);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteRueda = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/ruedas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateRuedas = async (rueda: Rueda): Promise<AxiosResponse> =>
  await axios.post("/ruedas/delete", rueda);

//Reportes----------------------------------------------------------------------------------------------------
// Get Ruedas Agrupadas por Estatus
export const getruedasCant = async (): Promise<AxiosResponse<Rueda[]>> =>
  await axios.get("/ruedas/getGpedByStat");

// Get Ruedas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Rueda[]>> =>
  await axios.get("/ruedas/getfactsGpedByCli");

// Get Ruedas Agrupadas por Vitola
export const getGpedByVitola = async (
  documento: any
): Promise<AxiosResponse<Rueda[]>> =>
  await axios.post("/ruedas/getGpedByVitola", documento);

// Obtener Incentivos 1
export const getInc1 = async (
  documento: any
): Promise<AxiosResponse<Rueda[]>> =>
  await axios.post("/ruedas/getInc1", documento);

// Obtener Incentivos 2
export const getInc2 = async (
  documento: any
): Promise<AxiosResponse<Rueda[]>> =>
  await axios.post("/ruedas/getInc2", documento);

// Obtener Incentivos 3
export const getInc3 = async (
  documento: any
): Promise<AxiosResponse<Rueda[]>> =>
  await axios.post("/ruedas/getInc3", documento);

// Obtener Incentivos 4
export const getInc4 = async (
  documento: any
): Promise<AxiosResponse<Rueda[]>> =>
  await axios.post("/ruedas/getInc4", documento);

//Ruedaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (rueda: Rueda): Promise<AxiosResponse> =>
  await axios.post("/ruedas/updateOne", rueda);
