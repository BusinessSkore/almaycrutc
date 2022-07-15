import { Nomina } from "@/interfaces/Nomina";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createNominaa = async (
  nomina: Nomina
): Promise<AxiosResponse> => await axios.post("/nominas/Savea", nomina);

// Crear un Solo Registro
export const createNomina = async (nomina: Nomina): Promise<AxiosResponse> =>
  await axios.post("/nominas/Save", nomina);

// Leer Todos los registros
export const getNominas = async (): Promise<AxiosResponse<Nomina[]>> =>
  await axios.get("/nominas/get");

//Leer un solo Registro por ID
export const getNomina = async (id: string): Promise<AxiosResponse<Nomina>> =>
  await axios.get(`/nominas/GetById/${id}`);

//Leer el último Registro
export const getOneNomina = async (): Promise<AxiosResponse<Nomina>> =>
  await axios.get("/nominas/GetOne");

//Actualizar un Registro
export const updateNomina = async (
  id: string,
  newNomina: Nomina
): Promise<AxiosResponse<Nomina>> =>
  await axios.put(`/nominas/Update/${id}`, newNomina);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteNomina = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/nominas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateNominas = async (
  nomina: Nomina
): Promise<AxiosResponse> => await axios.post("/nominas/delete", nomina);

//Reportes----------------------------------------------------------------------------------------------------
// Get Nominas Agrupadas por Estatus
export const getnominasCant = async (): Promise<AxiosResponse<Nomina[]>> =>
  await axios.get("/nominas/getGpedByStat");

// Get Nominas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Nomina[]>> =>
  await axios.get("/nominas/getfactsGpedByCli");

//Nominaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (nomina: Nomina): Promise<AxiosResponse> =>
  await axios.post("/nominas/updateOne", nomina);
