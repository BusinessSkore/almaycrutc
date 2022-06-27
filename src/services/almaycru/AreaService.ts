import { Area } from "@/interfaces/Area";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getAreas = async (): Promise<AxiosResponse<Area[]>> =>
  await axios.get("/areas/get");

export const getArea = async (id: string): Promise<AxiosResponse<Area>> =>
  await axios.get(`/areas/GetById/${id}`);

export const getOneArea = async (): Promise<AxiosResponse<Area>> =>
  await axios.get("/areas/GetOne");

export const createArea = async (area: Area): Promise<AxiosResponse> =>
  await axios.post("/areas/Save", area);

export const createAreaa = async (area: Area): Promise<AxiosResponse> =>
  await axios.post("/areas/Savea", area);

export const eliminateAreas = async (
  area: Area
): Promise<AxiosResponse> => await axios.post("/areas/delete", area);

export const updateOne = async (
  area: Area
): Promise<AxiosResponse> =>
  await axios.post("/areas/updateOne", area);

export const updateArea = async (
  id: string,
  newArea: Area
): Promise<AxiosResponse<Area>> =>
  await axios.put(`/areas/Update/${id}`, newArea);

export const deleteArea = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/areas/Delete/${id}`);
