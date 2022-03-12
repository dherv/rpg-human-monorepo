import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@atlaskit/datetime-picker';
import {
  useAddNewSessionMutation,
  useGetActivityQuery,
} from '../../features/api/apiSlice';
import { ActivitySession } from './ActivitySession';
import { Loader } from './Loader';

type Inputs = {
  date: string;
  duration: string;
  note: string;
  improvement: string;
  proud: string;
};

// TODO: rename ActivityAddSession
export const Activity: FC<{ selectedId: number }> = ({ selectedId }) => {
  // Data
  const {
    data: activity,
    isFetching,
    isLoading,
  } = useGetActivityQuery(selectedId);
  const [addNewSession] = useAddNewSessionMutation();

  // Form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await addNewSession({ activityId: selectedId, ...data });
    console.log("handlesubmit", response);
  };

  useEffect(() => {
    setValue("duration", activity?.duration.toString() ?? "");
  }, [activity]);

  if (isFetching || isLoading) {
    return <Loader />;
  }

  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>update activiy - {activity?.name}</h2>
        <div>
          <label htmlFor="date" />
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <DatePicker id="date" {...field} />}
          />

          <label htmlFor="duration" />
          <input
            type="number"
            min={0}
            id="duration"
            placeholder="3"
            {...(register("duration"), { required: true })}
          ></input>
        </div>

        <div>
          <label htmlFor="note"></label>
          <textarea
            id="note"
            {...register("note")}
            placeholder="note - today I dropped the mini - I was scared because people were watching but ended up dropping - difference with previous session = dropped alone compare to drop with people (courage+)"
          ></textarea>
        </div>

        <div>
          <label htmlFor="improvement"></label>
          <textarea
            id="improvement"
            {...register("improvement")}
            placeholder="what did you improve"
          ></textarea>
        </div>

        <div>
          <label htmlFor="proud"></label>
          <textarea
            id="proud"
            {...register("proud")}
            placeholder="what are you proud of during this session"
          ></textarea>
        </div>

        {/* TODO: add improve low skill like fear - procrastionation.... amount of points will add skill point ~120pts (trimestre = 1 point skill) for example- limit to 1pt per day */}
        {/* separate session info from extra rpg info - coombine with focal */}
        {/*  */}
        <button type="submit">log session</button>
      </form>
      {activity ? <ActivitySession activityId={activity.id} /> : null}
    </>
  );
};
