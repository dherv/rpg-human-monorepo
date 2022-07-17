import { Button, Form, Input, TextArea } from '@dherv-co/barbarian-with-style'
import { format } from 'date-fns'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAddNewSessionMutation } from '../../features/api/apiSlice'
import { Activity } from '../../types/types'

interface Props {
  activity: Activity
}

type Inputs = {
  date: string
  duration: string
  note: string
  improvement: string
  proud: string
}

export const SessionAdd: FC<Props> = ({ activity }) => {
  const navigate = useNavigate()
  const [addNewMutation, { isLoading, isSuccess }] = useAddNewSessionMutation()
  const { handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      date: format(Date.now(), 'MM/dd/yyyy'),
      duration: activity?.duration.toString(),
      note: '',
      improvement: '',
      proud: '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addNewMutation({
      activityId: activity.activityId,
      ...data,
    })
  }

  const handleNavigateSessions = () => navigate('/sessions', { replace: true })

  useEffect(() => {
    if (isSuccess) {
      reset()
      handleNavigateSessions()
      setTimeout(handleNavigateSessions, 1000)
    }
  }, [isSuccess])

  let buttonText = 'log session'
  if (isLoading) buttonText = '...'
  if (isSuccess) buttonText = 'SUBMITTED!!'

  return (
    <Form className='max-w-2xl' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name='date'
          control={control}
          rules={{
            required: 'please enter a date',
            pattern: {
              value: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/i,
              message: 'please enter a date in the valid format: 01/01/2022',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              label='date'
              type='text'
              id='date'
              placeholder={format(new Date(2016, 0, 1), 'MM/dd/yyyy')}
              error={error?.message}
              {...field}
            ></Input>
          )}
        />
      </div>

      <div>
        <Controller
          name='duration'
          control={control}
          rules={{ required: 'please enter a duration' }}
          render={({ field, fieldState: { error } }) => (
            <Input
              label='duration'
              type='number'
              min={1}
              id='duration'
              placeholder='3'
              error={error?.message}
              {...field}
            ></Input>
          )}
        />
      </div>

      <div>
        <Controller
          name='note'
          control={control}
          rules={{ required: 'please enter a note' }}
          render={({ field, fieldState: { error } }) => (
            <TextArea
              label='note'
              id='note'
              error={error?.message}
              placeholder='note - today I dropped'
              {...field}
            ></TextArea>
          )}
        />
      </div>

      <div>
        <Controller
          name='improvement'
          control={control}
          render={({ field }) => (
            <TextArea
              label='improvement'
              id='improvement'
              placeholder='what did you improve'
              {...field}
            ></TextArea>
          )}
        />
      </div>

      <div>
        <Controller
          name='proud'
          control={control}
          render={({ field }) => (
            <TextArea
              label='proud'
              id='proud'
              placeholder='what are you proud of during this session'
              {...field}
            ></TextArea>
          )}
        />
      </div>

      {/* TODO: add improve low skill like fear - procrastionation.... amount of points will add skill point ~120pts (trimestre = 1 point skill) for example- limit to 1pt per day */}
      {/* separate session info from extra rpg info - coombine with focal */}
      {/*  */}
      <Button type='submit' text={buttonText}></Button>
    </Form>
  )
}
