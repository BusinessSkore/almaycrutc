import { Usuario } from "@/interfaces/Usuario";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getUsuarios = async (): Promise<AxiosResponse<Usuario[]>> =>
  await axios.get("/usuarios/get");

export const getUsuario = async (id: string): Promise<AxiosResponse<Usuario>> =>
  await axios.get(`/usuarios/GetById/${id}`);

export const getOneUsuario = async (): Promise<AxiosResponse<Usuario>> =>
  await axios.get("/usuarios/GetOne");

export const registerUsuario = async (
  usuario: Usuario
): Promise<AxiosResponse> => await axios.post("/usuarios/signup", usuario);

export const loginUsuario = async (usuario: Usuario): Promise<AxiosResponse> =>
  await axios.post("/usuarios/login", usuario);

export const eliminateUsuarios = async (
  usuario: Usuario
): Promise<AxiosResponse> => await axios.post("/usuarios/delete", usuario);

export const getUsuariosCant = async (): Promise<AxiosResponse<Usuario[]>> =>
  await axios.get("/usuarios/getCantUsu");

export const getUsuariosByUser = async (
  usuario: Usuario
): Promise<AxiosResponse<Usuario>> =>
  await axios.post("/usuarios/GetByUser", usuario);

export const getUsuariosAsignar = async (
  usuario: Usuario
): Promise<AxiosResponse<Usuario>> =>
  await axios.post("/usuarios/GetByGroup", usuario);

export const updateUsuario = async (
  id: string,
  newUsuario: Usuario
): Promise<AxiosResponse<Usuario>> =>
  await axios.put(`/usuarios/Update/${id}`, newUsuario);

export const deleteUsuario = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/usuarios/Delete/${id}`);
