import { Vitola } from "@/interfaces/Vitola";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createVitolaa = async (
  vitola: Vitola
): Promise<AxiosResponse> => await axios.post("/vitolas/Savea", vitola);

// Crear un Solo Registro
export const createVitola = async (vitola: Vitola): Promise<AxiosResponse> =>
  await axios.post("/vitolas/Save", vitola);

// Leer Todos los registros
export const getVitolas = async (): Promise<AxiosResponse<Vitola[]>> =>
  await axios.get("/vitolas/get");

//Leer un solo Registro por ID
export const getVitola = async (id: string): Promise<AxiosResponse<Vitola>> =>
  await axios.get(`/vitolas/GetById/${id}`);

//Leer el último Registro
export const getOneVitola = async (): Promise<AxiosResponse<Vitola>> =>
  await axios.get("/vitolas/GetOne");

//Actualizar un Registro
export const updateVitola = async (
  id: string,
  newVitola: Vitola
): Promise<AxiosResponse<Vitola>> =>
  await axios.put(`/vitolas/Update/${id}`, newVitola);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteVitola = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/vitolas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateVitolas = async (
  vitola: Vitola
): Promise<AxiosResponse> => await axios.post("/vitolas/delete", vitola);

//Reportes----------------------------------------------------------------------------------------------------
// Get Vitolas Agrupadas por Estatus
export const getvitolasCant = async (): Promise<AxiosResponse<Vitola[]>> =>
  await axios.get("/vitolas/getGpedByStat");

// Get Vitolas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Vitola[]>> =>
  await axios.get("/vitolas/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (vitola: Vitola): Promise<AxiosResponse> =>
  await axios.post("/vitolas/updateOne", vitola);
