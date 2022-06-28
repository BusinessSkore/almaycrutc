import { Liga } from "@/interfaces/Liga";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createLigaa = async (
  liga: Liga
): Promise<AxiosResponse> => await axios.post("/ligas/Savea", liga);

// Crear un Solo Registro
export const createLiga = async (liga: Liga): Promise<AxiosResponse> =>
  await axios.post("/ligas/Save", liga);

// Leer Todos los registros
export const getLigas = async (): Promise<AxiosResponse<Liga[]>> =>
  await axios.get("/ligas/get");

//Leer un solo Registro por ID
export const getLiga = async (id: string): Promise<AxiosResponse<Liga>> =>
  await axios.get(`/ligas/GetById/${id}`);

//Leer el último Registro
export const getOneLiga = async (): Promise<AxiosResponse<Liga>> =>
  await axios.get("/ligas/GetOne");

//Actualizar un Registro
export const updateLiga = async (
  id: string,
  newLiga: Liga
): Promise<AxiosResponse<Liga>> =>
  await axios.put(`/ligas/Update/${id}`, newLiga);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteLiga = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/ligas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateLigas = async (
  liga: Liga
): Promise<AxiosResponse> => await axios.post("/ligas/delete", liga);

//Reportes----------------------------------------------------------------------------------------------------
// Get Ligas Agrupadas por Estatus
export const getligasCant = async (): Promise<AxiosResponse<Liga[]>> =>
  await axios.get("/ligas/getGpedByStat");

// Get Ligas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Liga[]>> =>
  await axios.get("/ligas/getfactsGpedByCli");

//Ligaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (liga: Liga): Promise<AxiosResponse> =>
  await axios.post("/ligas/updateOne", liga);
