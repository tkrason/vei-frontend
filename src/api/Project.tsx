import axios from "axios"

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
    .get<ProjectResponseDto>("http://localhost:8080/api/v1/project/all", { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getProjectsForClient(clientId: string): Promise<Project[]> {
  return await axios
    .get<ProjectResponseDto>("http://localhost:8080/api/v1/client/" + clientId + "/projects", { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getProject(projectId: string): Promise<Project> {
  return await axios
    .get<Project>("http://localhost:8080/api/v1/project/" + projectId, { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}

interface ProjectDeleteResponse {
  count: number
}

export async function deleteProject(projectId: string): Promise<ProjectDeleteResponse> {
  return await axios
    .delete<ProjectDeleteResponse>("http://localhost:8080/api/v1/project", { headers: { Authorization: "Bearer apiKey" }, params: { id: projectId } })
    .then(res => res.data)
}