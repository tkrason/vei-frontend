import axios from "axios"

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
    .get<FillableSlotsResponseDto>("http://localhost:8080/api/v1/project/" + projectId + "/fillable-slot", { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getFillableSlot(slotId: string): Promise<FillableSlot> {
  return await axios
    .get<FillableSlot>("http://localhost:8080/api/v1/fillable-slot/" + slotId, { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}

export async function addPersonToSlot(slotId: string, personId: string): Promise<any> {
  return await axios
    .post<FillableSlot>("http://localhost:8080/api/v1/fillable-slot/" + slotId + "/people", { personId: personId }, { headers: { Authorization: "Bearer apiKey" } })
}

export async function deletePersonFromSlot(slotId: string, personId: string): Promise<any> {
  return await axios
    .delete<FillableSlot>("http://localhost:8080/api/v1/fillable-slot/" + slotId + "/people/" + personId , { headers: { Authorization: "Bearer apiKey" } })
}

interface FillableSLotDeleteResponse {
  count: number
}

export async function deleteFillableSlot(id: string): Promise<FillableSLotDeleteResponse> {
  return await axios
    .delete<FillableSLotDeleteResponse>("http://localhost:8080/api/v1/fillable-slot", { headers: { Authorization: "Bearer apiKey" }, params: { id: id } })
    .then(res => res.data)
}
