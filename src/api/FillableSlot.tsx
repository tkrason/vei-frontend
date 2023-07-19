import axios from "axios"
import { API_PATHS } from "./Api"

export interface FillableSlotsResponseDto {
  data: FillableSlot[]
}

export interface FillableSlot {
  id: string,
  product: string,
  startDate: Date,
  endDate: Date,
  dailyRate: number,
  requiredNumberOfFillables: number,

  belongsToProject: string,
  poolOfPossibleFillables: string[],
}

export async function getFillableSlotsOnProject(projectId: string): Promise<FillableSlot[]> {
  return await axios
    .get<FillableSlotsResponseDto>(API_PATHS.routes.fillableSlot.routes.getAllOnProject(projectId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getFillableSlot(slotId: string): Promise<FillableSlot> {
  return await axios
    .get<FillableSlot>(API_PATHS.routes.fillableSlot.routes.getOne(slotId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}

export async function addPersonToSlot(slotId: string, personId: string): Promise<any> {
  return await axios
    .post<FillableSlot>(API_PATHS.routes.fillableSlot.routes.addPerson(slotId), { personId: personId }, { headers: { Authorization: "Bearer apiKey" } })
}

export async function deletePersonFromSlot(slotId: string, personId: string): Promise<any> {
  return await axios
    .delete<FillableSlot>(API_PATHS.routes.fillableSlot.routes.deletePerson(slotId, personId), { headers: { Authorization: "Bearer apiKey" } })
}

interface FillableSLotDeleteResponse {
  count: number
}

export async function deleteFillableSlot(slotId: string): Promise<FillableSLotDeleteResponse> {
  return await axios
    .delete<FillableSLotDeleteResponse>(API_PATHS.routes.fillableSlot.routes.deleteOne(slotId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}
