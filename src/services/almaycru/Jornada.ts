import { Jornada } from "@/interfaces/Jornada";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createJornadaa = async (jornada: Jornada): Promise<AxiosResponse> =>
  await axios.post("/jornadas/Savea", jornada);

// Crear un Solo Registro
export const createJornada = async (jornada: Jornada): Promise<AxiosResponse> =>
  await axios.post("/jornadas/Save", jornada);

// Leer Todos los registros
export const getJornadas = async (): Promise<AxiosResponse<Jornada[]>> =>
  await axios.get("/jornadas/get");

//Leer un solo Registro por ID
export const getJornada = async (id: string): Promise<AxiosResponse<Jornada>> =>
  await axios.get(`/jornadas/GetById/${id}`);

//Leer el último Registro
export const getOneJornada = async (): Promise<AxiosResponse<Jornada>> =>
  await axios.get("/jornadas/GetOne");

//Actualizar un Registro
export const updateJornada = async (
  id: string,
  newJornada: Jornada
): Promise<AxiosResponse<Jornada>> =>
  await axios.put(`/jornadas/Update/${id}`, newJornada);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteJornada = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/jornadas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateJornadas = async (jornada: Jornada): Promise<AxiosResponse> =>
  await axios.post("/jornadas/delete", jornada);

//Reportes----------------------------------------------------------------------------------------------------
// Get Jornadas Agrupadas por Estatus
export const getjornadasCant = async (): Promise<AxiosResponse<Jornada[]>> =>
  await axios.get("/jornadas/getGpedByStat");

// Get Jornadas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Jornada[]>> =>
  await axios.get("/jornadas/getfactsGpedByCli");

// Get Jornadas Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Jornada[]>> =>
  await axios.get("/jornadas/getGpedByVitola");

//Jornadaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (jornada: Jornada): Promise<AxiosResponse> =>
  await axios.post("/jornadas/updateOne", jornada);
