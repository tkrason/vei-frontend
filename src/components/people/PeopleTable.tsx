import { Link } from "react-router-dom"
import { Person, Skill, SkillSeniority, deletePerson } from "../../api/People"
import { Button } from "../../global/button"
import { TableRow, TableCell, TableBody, TableHead, TableHeader, Table } from "../../global/components/ui/table"
import { Badge } from "../../global/components/ui/badge"
import debounce from 'lodash.debounce';

interface PeopleTableProps {
  people: Person[],
  deleteFunction: (person: Person) => void
}

export const PeopleTable: React.FC<PeopleTableProps> = (peopleTableProps: PeopleTableProps) => {

  let rows = peopleTableProps.people.map(person => {

    let skillBadgesPart = createSkillBadges(person.skills)

    return (
      <TableRow>
        <TableCell>{person.id}</TableCell>
        <TableCell>{person.name}</TableCell>
        <TableCell>{person.surname}</TableCell>
        <TableCell>{person.hoursPerMonth}</TableCell>
        <TableCell>{person.status}</TableCell>
        <TableCell className="w-1/2">{skillBadgesPart}</TableCell>
        <TableCell>
          <Button key={person.id} variant='destructive' onClick={_ => peopleTableProps.deleteFunction(person)}>Delete</Button>
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
            <TableHead>Status</TableHead>
            <TableHead>Skills</TableHead>
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

  if(firstOrder > secondOrder) return 1
  if(firstOrder < secondOrder) return -1
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



