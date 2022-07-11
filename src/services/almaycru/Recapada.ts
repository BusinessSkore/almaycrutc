import { Recapada } from "@/interfaces/Recapada";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createRecapadaa = async (recapada: Recapada): Promise<AxiosResponse> =>
  await axios.post("/recapadas/Savea", recapada);

// Crear un Solo Registro
export const createRecapada = async (recapada: Recapada): Promise<AxiosResponse> =>
  await axios.post("/recapadas/Save", recapada);

// Leer Todos los registros
export const getRecapadas = async (): Promise<AxiosResponse<Recapada[]>> =>
  await axios.get("/recapadas/get");

//Leer un solo Registro por ID
export const getRecapada = async (id: string): Promise<AxiosResponse<Recapada>> =>
  await axios.get(`/recapadas/GetById/${id}`);

//Leer el último Registro
export const getOneRecapada = async (): Promise<AxiosResponse<Recapada>> =>
  await axios.get("/recapadas/GetOne");

//Actualizar un Registro
export const updateRecapada = async (
  id: string,
  newRecapada: Recapada
): Promise<AxiosResponse<Recapada>> =>
  await axios.put(`/recapadas/Update/${id}`, newRecapada);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteRecapada = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/recapadas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateRecapadas = async (recapada: Recapada): Promise<AxiosResponse> =>
  await axios.post("/recapadas/delete", recapada);

//Reportes----------------------------------------------------------------------------------------------------
// Get Recapadas Agrupadas por Estatus
export const getrecapadasCant = async (): Promise<AxiosResponse<Recapada[]>> =>
  await axios.get("/recapadas/getGpedByStat");

// Get Recapadas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Recapada[]>> =>
  await axios.get("/recapadas/getfactsGpedByCli");

// Get Recapadas Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Recapada[]>> =>
  await axios.get("/recapadas/getGpedByVitola");

//Recapadaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (recapada: Recapada): Promise<AxiosResponse> =>
  await axios.post("/recapadas/updateOne", recapada);
