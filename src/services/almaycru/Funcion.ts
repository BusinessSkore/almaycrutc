import { Funcion } from "@/interfaces/Funcion";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createFunciona = async (
  funcion: Funcion
): Promise<AxiosResponse> => await axios.post("/funcions/Savea", funcion);

// Crear un Solo Registro
export const createFuncion = async (funcion: Funcion): Promise<AxiosResponse> =>
  await axios.post("/funcions/Save", funcion);

// Leer Todos los registros
export const getFuncions = async (): Promise<AxiosResponse<Funcion[]>> =>
  await axios.get("/funcions/get");

//Leer un solo Registro por ID
export const getFuncion = async (id: string): Promise<AxiosResponse<Funcion>> =>
  await axios.get(`/funcions/GetById/${id}`);

//Leer el último Registro
export const getOneFuncion = async (): Promise<AxiosResponse<Funcion>> =>
  await axios.get("/funcions/GetOne");

//Actualizar un Registro
export const updateFuncion = async (
  id: string,
  newFuncion: Funcion
): Promise<AxiosResponse<Funcion>> =>
  await axios.put(`/funcions/Update/${id}`, newFuncion);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteFuncion = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/funcions/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateFuncions = async (
  funcion: Funcion
): Promise<AxiosResponse> => await axios.post("/funcions/delete", funcion);

//Reportes----------------------------------------------------------------------------------------------------
// Get Funcions Agrupadas por Estatus
export const getfuncionsCant = async (): Promise<AxiosResponse<Funcion[]>> =>
  await axios.get("/funcions/getGpedByStat");

// Get Funcions Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Funcion[]>> =>
  await axios.get("/funcions/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (funcion: Funcion): Promise<AxiosResponse> =>
  await axios.post("/funcions/updateOne", funcion);
