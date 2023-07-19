import axios from "axios"
import { API_PATHS } from "./Api"

export interface ProjectResponseDto {
  data: Project[]
}

export interface Project {
  id: string,
  name: string,
  priority: ProjectPriority,
  type: ProjectType,
  startDate: Date,
  endDate?: Date,
  description: string,
  isTentative: boolean,
  probability: number,
  currency: ProjectCurrencies,

  belongsToClient: string,
}

enum ProjectPriority {
  URGENT,
  HIGH,
  MEDIUM,
  LOW,
}

enum ProjectType {
  TIME_AND_MATERIAL,
  FIXED_PRICE_FIXED_SCOPE,
  OTHER,
}

enum ProjectCurrencies {
  EUR,
  USD,
  GBP,
}

export async function getProjects(): Promise<Project[]> {
  return await axios
    .get<ProjectResponseDto>(API_PATHS.routes.project.routes.getAll(), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getProjectsForClient(clientId: string): Promise<Project[]> {
  return await axios
    .get<ProjectResponseDto>(API_PATHS.routes.project.routes.getProjectsForClient(clientId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getProject(projectId: string): Promise<Project> {
  return await axios
    .get<Project>(API_PATHS.routes.project.routes.getOne(projectId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}

interface ProjectDeleteResponse {
  count: number
}

export async function deleteProject(projectId: string): Promise<ProjectDeleteResponse> {
  return await axios
    .delete<ProjectDeleteResponse>(API_PATHS.routes.project.routes.deleteOne(projectId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}