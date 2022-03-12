import { FormEvent, useState } from 'react';
import { useAddNewActivityMutation } from '../../features/api/apiSlice';

export const ActivityAddForm = () => {
  const [name, setName] = useState<string>("");
  const [defaultTime, setDefaultTime] = useState<number>();
  const [addNewActivity, { isLoading }] = useAddNewActivityMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      try {
        await addNewActivity({ name });
        setName("");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" hidden>
        name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event?.target.value)}
        placeholder="name"
      />
      <input type="number" name="defaultTime"></input>
      <button type="submit">submit</button>
    </form>
  );
};
