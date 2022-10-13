import { Mono } from "@/interfaces/Mono";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createMonoa = async (
  mono: Mono
): Promise<AxiosResponse> => await axios.post("/monos/Savea", mono);

// Crear un Solo Registro
export const createMono = async (
  mono: Mono
): Promise<AxiosResponse> => await axios.post("/monos/Save", mono);

// Leer Todos los registros Detallados
export const getMonos = async (
  criterio: any
): Promise<AxiosResponse<Mono[]>> =>
  await axios.post("/monos/get", criterio);

// Leer Todos los registros Agrupados
export const getMonos2 = async (
  criterio: any
): Promise<AxiosResponse<Mono[]>> =>
  await axios.post("/monos/getall", criterio);

//Leer un solo Registro por ID
export const getMono = async (
  id: string
): Promise<AxiosResponse<Mono>> =>
  await axios.get(`/monos/GetById/${id}`);

//Leer el último Registro
export const getOneMono = async (): Promise<AxiosResponse<Mono>> =>
  await axios.get("/monos/GetOne");

//Actualizar un Registro
export const updateMono = async (
  id: string,
  newMono: Mono
): Promise<AxiosResponse<Mono>> =>
  await axios.put(`/monos/Update/${id}`, newMono);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteMono = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/monos/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateMonos = async (
  mono: Mono
): Promise<AxiosResponse> => await axios.post("/monos/delete", mono);

//Reportes----------------------------------------------------------------------------------------------------
// Get Monos Agrupadas por Estatus
export const getmonosCant = async (): Promise<AxiosResponse<Mono[]>> =>
  await axios.get("/monos/getGpedByStat");

// Get Monos Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Mono[]>> =>
  await axios.get("/monos/getfactsGpedByCli");

// Get Monos Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Mono[]>> =>
  await axios.get("/monos/getGpedByVitola");

//Monoes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (mono: Mono): Promise<AxiosResponse> =>
  await axios.post("/monos/updateOne", mono);
