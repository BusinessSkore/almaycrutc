import { AxiosResponse } from "axios";
import axios from "./axios";

export const createMensaje = async (mensaje: []): Promise<AxiosResponse> =>
  await axios.post("/pushers/messages", mensaje);