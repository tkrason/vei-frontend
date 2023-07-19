import axios from "axios";
import { API_PATHS } from "./Api";

interface ClientResponseDto {
  data: Client[]
}

export interface Client {
  id: string,
  name: string,
  category: ClientCategory,
  priority: ClientPriority,
  cooperationStart: Date,
  cooperationEnd?: Date,
  description: string,
  contact: Contact
}

enum ClientCategory {
  MEDTECH,
  FINTECH,
  CRYPTO
}

enum ClientPriority {
  LOW,
  MEDIUM,
  HIGH
}

interface Contact {
  legalName: string,
  registrationNumber: string,
  address: string,
  note: string
}

export async function getClients(): Promise<ClientResponseDto> {
  return await axios
    .get<ClientResponseDto>(API_PATHS.routes.client.routes.getAll(), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}


export async function getClient(clientId: string): Promise<Client> {
  return await axios
    .get(API_PATHS.routes.client.routes.getOne(clientId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}

export interface ClientDeleteResponse {
  deletedClients: number,
  deletedProjects: number
}

export async function deleteClient(clientId: string): Promise<ClientDeleteResponse> {
  return await axios
    .delete<ClientDeleteResponse>(API_PATHS.routes.client.routes.deleteOne(clientId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}