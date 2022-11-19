import { Button, Form, Input, TextArea } from '@dherv-co/barbarian-with-style'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { useAddNewSessionMutation } from '../../features/api/apiSlice'
import { Activity } from '../../types/types'
import { DateTimePicker } from './DateTimePicker'
interface Props {
  activity: Activity
}

export type Inputs = {
  date: Date
  duration: string
  note: string
  improvement: string
  proud: string
}

const schema = z.object({
  date: z.date({
    // eslint-disable-next-line camelcase
    // required_error: 'please enter a date',
    // eslint-disable-next-line camelcase
    invalid_type_error: 'please enter a valid date',
  }),
  duration: z.string().min(1, {
    message: 'duration is required',
  }),
  note: z.string().min(1, { message: 'please enter a note' }),
  improvement: z.string(),
  proud: z.string(),
})

export const SessionAdd: FC<Props> = ({ activity }) => {
  const navigate = useNavigate()
  const [addNewMutation, { isLoading, isSuccess }] = useAddNewSessionMutation()
  const { handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      date: new Date(),
      duration: activity?.duration.toString(),
      note: '',
      improvement: '',
      proud: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addNewMutation({
      activityId: activity.activityId,
      ...data,
    })
  }

  useEffect(() => {
    const handleNavigateSessions = () => navigate('/sessions', { replace: true })
    if (isSuccess) {
      reset()
      handleNavigateSessions()
      setTimeout(handleNavigateSessions, 1000)
    }
  }, [isSuccess, reset, navigate])

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
          }}
          render={(props) => (
            <>
              <label htmlFor='date' className='block mb-1 font-medium'>
                date
              </label>
              <DateTimePicker {...props} />
            </>
          )}
        />
      </div>

      <div>
        <Controller
          name='duration'
          control={control}
          rules={{ required: 'please enter a duration' }}
          render={({ field, fieldState }) => {
            return (
              <Input
                label='duration'
                type='number'
                min={1}
                id='duration'
                placeholder='...'
                error={fieldState.error?.message}
                {...field}
              ></Input>
            )
          }}
        />
      </div>

      <div>
        <Controller
          name='note'
          control={control}
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
