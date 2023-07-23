import axios from "axios"
import { API_PATHS } from "./Api"

export interface PeopleResponseDto {
  data: Person[]
}

export interface Person {
  id: string,
  name: string,
  surname: string,
  skills: Skill[],
  hoursPerMonth: number,
  status: PersonStatus, // TODO: Not used
}

export interface Skill {
  skillName: string,
  seniority: SkillSeniority
}

export enum SkillSeniority {
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
}

enum PersonStatus {
  ACTIVE,
  INACTIVE,
}

export async function getPeople(): Promise<Person[]> {
  return await axios
    .get<PeopleResponseDto>(API_PATHS.routes.people.routes.getAll(), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getPeopleInSlot(slotId: string): Promise<Person[]> {
  return await axios
    .get<PeopleResponseDto>(API_PATHS.routes.fillableSlot.routes.getAllPeople(slotId), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

interface PersonDeleteResponse {
  count: number
}

export async function deletePerson(id: string): Promise<PersonDeleteResponse> {
  return await axios
    .delete<PersonDeleteResponse>(API_PATHS.routes.people.routes.deleteOne(id), { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data)
}