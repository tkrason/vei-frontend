import { Person, Skill, SkillSeniority } from "../../../api/People"
import { Button } from "../../../global/button"
import { TableRow, TableCell, TableBody, TableHead, TableHeader, Table } from "../../../global/components/ui/table"
import { Badge } from "../../../global/components/ui/badge"
import { PeopleOnProjectsDto, getPeopleAllocations } from "../../../api/Stats"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { SlotOptionState } from "../../../api/FillableSlot"

interface PeopleTableProps {
  people: Person[],
  deleteFunction: (person: Person) => void
}

export const AllPeopleTable: React.FC<PeopleTableProps> = (peopleTableProps: PeopleTableProps) => {

  const { isSuccess: isSuccessStats, data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getPeopleAllocations(new Date("2020-01-01"), new Date("2030-01-01"))
  })

  let rows = peopleTableProps.people.map(person => {

    let skillBadgesPart = createSkillBadges(person.skills)

    const allocationStats = isSuccessStats ? stats
      .filter(stat => stat.personId == person.id)
      .map(stat => {

        let stateFormatted = stat.state === SlotOptionState.HARDBOOKED ? <b>{stat.state}</b> : <>{stat.state}</>

        return <div className="pb-3">{stateFormatted} | {stat.label} - Start: <b>{stat.start.toString()}</b> End: <b>{stat.end.toString()}</b></div>
      }) : <div>Loading allocation stats...</div>

    return (
      <TableRow>
        <TableCell>{person.id}</TableCell>
        <TableCell>{person.name}</TableCell>
        <TableCell>{person.surname}</TableCell>
        <TableCell>{person.hoursPerMonth}</TableCell>
        <TableCell>{skillBadgesPart}</TableCell>
        <TableCell>
          <div className="flex flex-col">
            {allocationStats}
          </div>
        </TableCell>
        <TableCell>
          <Button key={person.id} className='text-red-500' variant='outline' onClick={_ => peopleTableProps.deleteFunction(person)}>Delete</Button>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Hours per month</TableHead>
          
            <TableHead>Skills</TableHead>
            <TableHead>Allocations</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </>
  )


}

const order = [SkillSeniority.LEAD, SkillSeniority.SENIOR, SkillSeniority.MID, SkillSeniority.JUNIOR]
const compareSkillsFn = (first: Skill, second: Skill) => {
  let firstOrder = order.indexOf(first.seniority)
  let secondOrder = order.indexOf(second.seniority)

  if (firstOrder > secondOrder) return 1
  if (firstOrder < secondOrder) return -1
  return 0
}

export function createSkillBadges(skills: Skill[]) {
  let badges = skills
    .sort(compareSkillsFn)
    .map(skill => {
      let badgeColor = getBadgeColorBasedOnSeniority(skill.seniority)
      return <Badge className={"m-1 " + badgeColor}>{skill.skillName} - {skill.seniority}</Badge>
    })

  return (
    <>{badges}</>
  )
}

function getBadgeColorBasedOnSeniority(seniority: SkillSeniority) {
  switch (seniority) {
    case SkillSeniority.JUNIOR:
      return 'bg-red-400'
    case SkillSeniority.MID:
      return 'bg-yellow-400'
    case SkillSeniority.SENIOR:
      return 'bg-green-400'
    case SkillSeniority.LEAD:
      return 'bg-blue-400'
  }
}



