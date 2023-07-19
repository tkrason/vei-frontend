import axios from "axios";

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
    .get<ClientResponseDto>("http://localhost:8080/api/v1/client/all", { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}

export interface ClientDeleteResponse {
  deletedClients: number,
  deletedProjects: number
}

export async function deleteClient(id: string): Promise<ClientDeleteResponse> {
  return await axios
    .delete<ClientDeleteResponse>("http://localhost:8080/api/v1/client", { headers: { Authorization: "Bearer apiKey" }, params: { id: id } })
    .then(res => res.data)
}

export async function getClient(id: string): Promise<Client> {
  return await axios
    .get("http://localhost:8080/api/v1/client/" + id, { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}