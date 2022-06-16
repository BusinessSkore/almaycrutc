import { Factura } from "@/interfaces/Factura";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createFacturaa = async (
  factura: Factura
): Promise<AxiosResponse> => await axios.post("/facturas/Savea", factura);

// Crear un Solo Registro
export const createFactura = async (factura: Factura): Promise<AxiosResponse> =>
await axios.post("/facturas/Save", factura);

// Leer Todos los registros
export const getFacturas = async (): Promise<AxiosResponse<Factura[]>> =>
  await axios.get("/facturas/get");

//Leer un solo Registro por ID
export const getFactura = async (id: string): Promise<AxiosResponse<Factura>> =>
  await axios.get(`/facturas/GetById/${id}`);

//Leer el último Registro
export const getOneFactura = async (): Promise<AxiosResponse<Factura>> =>
  await axios.get("/facturas/GetOne");

//Actualizar un Registro
  export const updateFactura = async (
    id: string,
    newFactura: Factura
  ): Promise<AxiosResponse<Factura>> =>
    await axios.put(`/facturas/Update/${id}`, newFactura);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteFactura = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/facturas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateFacturas = async (
  factura: Factura
): Promise<AxiosResponse> => await axios.post("/facturas/delete", factura);

//Reportes----------------------------------------------------------------------------------------------------
// Get Facturas Pendientes
export const getMejPend = async (): Promise<AxiosResponse<Factura[]>> =>
  await axios.get("/facturas/getMejPend");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (factura: Factura): Promise<AxiosResponse> =>
  await axios.post("/facturas/updateOne", factura);


