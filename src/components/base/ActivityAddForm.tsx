import { FormEvent, useState } from 'react';
import { useAddNewActivityMutation } from '../../features/api/apiSlice';

export const ActivityAddForm = () => {
  const [name, setName] = useState<string>("");
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
      <button type="submit">submit</button>
    </form>
  );
};
