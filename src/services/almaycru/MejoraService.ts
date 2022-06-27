import { Mejora } from "@/interfaces/Mejora";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getMejoras = async (): Promise<AxiosResponse<Mejora[]>> =>
  await axios.get("/mejoras/get");

export const getMejora = async (id: string): Promise<AxiosResponse<Mejora>> =>
  await axios.get(`/mejoras/GetById/${id}`);

export const getOneMejora = async (): Promise<AxiosResponse<Mejora>> =>
  await axios.get("/mejoras/GetOne");

export const createMejora = async (mejora: Mejora): Promise<AxiosResponse> =>
  await axios.post("/mejoras/Save", mejora);

export const createMejoraa = async (mejora: Mejora): Promise<AxiosResponse> =>
  await axios.post("/mejoras/Savea", mejora);

export const getMejPend = async (): Promise<AxiosResponse<Mejora[]>> =>
  await axios.get("/mejoras/getMejPend");
  
export const eliminateMejoras = async (
  mejora: Mejora
): Promise<AxiosResponse> => await axios.post("/mejoras/delete", mejora);

export const updateOne = async (mejora: Mejora): Promise<AxiosResponse> =>
  await axios.post("/mejoras/updateOne", mejora);

export const updateMejora = async (
  id: string,
  newMejora: Mejora
): Promise<AxiosResponse<Mejora>> =>
  await axios.put(`/mejoras/Update/${id}`, newMejora);

export const deleteMejora = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/mejoras/Delete/${id}`);
