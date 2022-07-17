import { ArrowCircleLeftIcon } from '@heroicons/react/outline'
import { skipToken } from '@reduxjs/toolkit/dist/query/react'
import { FC, useState } from 'react'
import { useGetActivityQuery } from '../../features/api/apiSlice'
import { Activities } from '../base/Activities'
import { DotText } from '../base/DotText'
import { SessionAdd } from '../base/SessionAdd'

export const SessionAddPage: FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<number>()
  const handleClick = (activityId: number) => setSelectedActivityId(activityId)
  const handleBack = () => setSelectedActivityId(undefined)
  const { data: activity } = useGetActivityQuery(selectedActivityId ?? skipToken)

  const content =
    selectedActivityId && activity ? (
      <div className='p-2'>
        <div className='flex items-center text-gray-700 mb-4 cursor-pointer' onClick={handleBack}>
          <ArrowCircleLeftIcon className='h-4 w-4'></ArrowCircleLeftIcon>
          <span className='text-sm ml-2'>back to activities</span>
        </div>
        <DotText text={activity.name} color={activity.color} />

        <SessionAdd activity={activity} />
      </div>
    ) : (
      <Activities onClick={handleClick} />
    )
  return <section>{content}</section>
}
