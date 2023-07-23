import axios from "axios"
import { API_PATHS } from "./Api"
import { SlotOptionState } from "./FillableSlot"

export interface PeopleOnProjectsDto {
  personId: string,
  slotId: string,
  projectId: string,
  clientId: string,

  start: Date,
  end: Date,
  state: SlotOptionState,
  label: string
}

export async function getPeopleAllocations(from: Date, to: Date): Promise<PeopleOnProjectsDto[]> {
  return await axios
    .get<PeopleOnProjectsDto[]>(API_PATHS.routes.stats.routes.getPeopleAllocations(), { params: {
      "start-date": from.toISOString().substring(0, 10), // yyyy-MM-dd
      "end-date" : to.toISOString().substring(0, 10) // yyyy-MM-dd
    } , headers: { Authorization: "Bearer apiKey" },  })
    .then(res => res.data)
}