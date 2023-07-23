import axios from "axios"
import { API_PATHS } from "./Api"
import { Person } from "./People"

export interface FillableSlotsResponseDto {
  data: FillableSlot[]
}

export interface FillableSlot {
  id: string,
  product: string,
  startDate: Date,
  endDate: Date,
  dailyRate: number,
  requiredNumberOfFillables: number, // Unused for now...

  belongsToProject: string,
  poolOfPossibleFillables: SlotOption[],
}

export interface SlotOption {
  personId: string,
  state: SlotOptionState,
  fte: number
}

export enum SlotOptionState {
  PREBOOKED = 'PREBOOKED',
  HARDBOOKED = 'HARDBOOKED'
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

export async function prebookPersonIntoSlot(slotId: string, personId: string): Promise<any> {

  let body = { 
    personId: personId,
    state: SlotOptionState.PREBOOKED,
    fte: 100
  }

  return await axios
    .post<FillableSlot>(API_PATHS.routes.fillableSlot.routes.addPerson(slotId), body, { headers: { Authorization: "Bearer apiKey" } })
}

export async function hardbookPersonIntoSlot(slotId: string, personId: string): Promise<any> {

  let body = { 
    personId: personId,
    state: SlotOptionState.HARDBOOKED,
    fte: 100
  }

  return await axios
    .post<FillableSlot>(API_PATHS.routes.fillableSlot.routes.addPerson(slotId), body , { headers: { Authorization: "Bearer apiKey" } })
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
