import { Prestamo } from "@/interfaces/Prestamo";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createPrestamoa = async (prestamo: Prestamo): Promise<AxiosResponse> =>
  await axios.post("/prestamos/Savea", prestamo);

// Actualizar Cuota de Préstamo
export const GetResult = async (empleado: any): Promise<AxiosResponse> =>
  await axios.post("/prestamos/GetEmpl", empleado);

// Restaurar Cuota de Préstamo
export const GetRestoreResult = async (empleado: any): Promise<AxiosResponse> =>
  await axios.post("/prestamos/GetRestoreEmpl", empleado);

// Crear un Solo Registro
export const createPrestamo = async (prestamo: Prestamo): Promise<AxiosResponse> =>
  await axios.post("/prestamos/Save", prestamo);

// Leer Todos los registros
export const getPrestamos = async (): Promise<AxiosResponse<Prestamo[]>> =>
  await axios.get("/prestamos/get");

//Leer un solo Registro por ID
export const getPrestamo = async (id: string): Promise<AxiosResponse<Prestamo>> =>
  await axios.get(`/prestamos/GetById/${id}`);

//Leer el último Registro
export const getOnePrestamo = async (): Promise<AxiosResponse<Prestamo>> =>
  await axios.get("/prestamos/GetOne");

//Actualizar un Registro
export const updatePrestamo = async (
  id: string,
  newPrestamo: Prestamo
): Promise<AxiosResponse<Prestamo>> =>
  await axios.put(`/prestamos/Update/${id}`, newPrestamo);

//Actualizar todos los Registros

//Eliminar un Registro
export const deletePrestamo = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/prestamos/Delete/${id}`);

//Eliminar todos los Registros
export const eliminatePrestamos = async (prestamo: Prestamo): Promise<AxiosResponse> =>
  await axios.post("/prestamos/delete", prestamo);

//Reportes----------------------------------------------------------------------------------------------------
// Get Prestamos Agrupadas por Estatus
export const getprestamosCant = async (): Promise<AxiosResponse<Prestamo[]>> =>
  await axios.get("/prestamos/getGpedByStat");

// Get Prestamos Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Prestamo[]>> =>
  await axios.get("/prestamos/getfactsGpedByCli");

// Get Prestamos Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Prestamo[]>> =>
  await axios.get("/prestamos/getGpedByVitola");

//Prestamoes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (prestamo: Prestamo): Promise<AxiosResponse> =>
  await axios.post("/prestamos/updateOne", prestamo);
