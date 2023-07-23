import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFillableSlotsOnProject } from '../../../../api/FillableSlot'
import { Button } from '../../../../global/button'
import { FillableSlotTable } from './SlotManagementTable'

interface PeopleInSlotProps {
  projectId: string
}

export const PeopleInSlot: React.FC<PeopleInSlotProps> = (peopleInSlotsProps: PeopleInSlotProps) => {

  const { isSuccess: isSlotsSuccess, data: slotsData, refetch: slotsRefetch } = useQuery({
    queryKey: ["projects", peopleInSlotsProps.projectId, 'fillable-slot'],
    queryFn: () => getFillableSlotsOnProject(peopleInSlotsProps.projectId)
  })

  if (isSlotsSuccess) {
    return (
      <div className='flex flex-col'>
        <div className='flex'>
          <div className='flex-auto text-left'>Slots</div>
          <Button className='bg-green-300 mr-8'>Add slot</Button>
        </div>
        <div className='mt-4'>
          <FillableSlotTable slots={slotsData} refetchSlots={slotsRefetch} ></FillableSlotTable>
        </div>
      </div>
    )
  } else {
    <div>Loading slots data...</div>
  }
}

export default PeopleInSlot