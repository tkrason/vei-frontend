import axios from "axios"

export interface PeopleResponseDto {
  data: Person[]
}

export interface Person {
  id: string,
  name: string,
  surname: string,
  skills: Skill[],
  hoursPerMonth: number,
  status: PersonStatus,
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
    .get<PeopleResponseDto>("http://localhost:8080/api/v1/people/all", { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

export async function getPeopleInSlot(slotId: string): Promise<Person[]> {
  return await axios
    .get<PeopleResponseDto>("http://localhost:8080/api/v1/fillable-slot/" + slotId + "/people", { headers: { Authorization: "Bearer apiKey" } })
    .then(res => res.data.data)
}

interface PersonDeleteResponse {
  count: number
}

export async function deletePerson(id: string): Promise<PersonDeleteResponse> {
  return await axios
    .delete<PersonDeleteResponse>("http://localhost:8080/api/v1/people", { headers: { Authorization: "Bearer apiKey" }, params: { id: id } })
    .then(res => res.data)
}