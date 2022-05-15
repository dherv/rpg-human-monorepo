import { Button, Form, FormTitle, Input } from '@dherv/barbarian-with-style'
import { FormEvent, useState } from 'react'
import { useAddNewActivityMutation } from '../../features/api/apiSlice'

export const ActivityAddForm = () => {
  const [name, setName] = useState<string>('')
  const [defaultTime, setDefaultTime] = useState<string>('')
  const [addNewActivity, { isLoading }] = useAddNewActivityMutation()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isLoading) {
      try {
        // TODO: add validation here
        await addNewActivity({ name, duration: Number(defaultTime) })
        setName('')
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Add activity</FormTitle>
      <Input
        id='name'
        type='text'
        label='name'
        name='name'
        placeholder='name'
        value={name}
        onChange={(event) => setName(event?.target.value)}
      />
      <Input
        type='number'
        id='defaultTime'
        label='default time'
        placeholder='default time'
        name='defaultTime'
        value={defaultTime}
        onChange={(event) => setDefaultTime(event?.target.value)}
      ></Input>
      <Button type='submit' text='submit'></Button>
    </Form>
  )
}
