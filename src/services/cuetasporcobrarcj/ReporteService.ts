import { Reporte } from "@/interfaces/Reporte";
import { Usuario } from "@/interfaces/Usuario";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getReportes = async (): Promise<AxiosResponse<Reporte[]>> =>
  await axios.get("/reportes/get");

export const getReportesByUser = async (
  usuario: Usuario
): Promise<AxiosResponse<Usuario>> =>
  await axios.post("/reportes/GetByUser", usuario);

export const getReportesByUser2 = async (
  usuario: Usuario
): Promise<AxiosResponse<Usuario>> =>
  await axios.post("/reportes/GetByUser2", usuario);

export const getReporte = async (id: string): Promise<AxiosResponse<Reporte>> =>
  await axios.get(`/reportes/GetById/${id}`);

export const getOneReporte = async (): Promise<AxiosResponse<Reporte>> =>
  await axios.get("/reportes/GetOne");

export const createReporte = async (reporte: Reporte): Promise<AxiosResponse> =>
  await axios.post("/reportes/Save", reporte);

export const createReportea = async (
  reporte: Reporte
): Promise<AxiosResponse> => await axios.post("/reportes/Savea", reporte);

export const getReportesCant = async (): Promise<AxiosResponse<Reporte[]>> =>
  await axios.get("/reportes/getCantRep");

export const eliminateReportes = async (
  reporte: Reporte
): Promise<AxiosResponse> => await axios.post("/reportes/delete", reporte);

export const updateOne = async (reporte: Reporte): Promise<AxiosResponse> =>
  await axios.post("/reportes/updateOne", reporte);

export const updateReporte = async (
  id: string,
  newReporte: Reporte
): Promise<AxiosResponse<Reporte>> =>
  await axios.put(`/reportes/Update/${id}`, newReporte);

export const deleteReporte = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/reportes/Delete/${id}`);
