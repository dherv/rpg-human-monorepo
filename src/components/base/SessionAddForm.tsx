import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@atlaskit/datetime-picker';
import {
  Button,
  Form,
  FormTitle,
  Input,
  TextArea,
} from '@dherv/barbarian-with-style';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import {
  useAddNewSessionMutation,
  useGetActivityQuery,
} from '../../features/api/apiSlice';
import { Loader } from './Loader';

type Inputs = {
  date: string;
  duration: string;
  note: string;
  improvement: string;
  proud: string;
};

// TODO: rename ActivityAddSession
export const SessionAddForm: FC<{ selectedActivityId?: number }> = ({
  selectedActivityId,
}) => {
  // Data
  const {
    data: activity,
    isFetching,
    isLoading,
  } = useGetActivityQuery(selectedActivityId ?? skipToken);
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
    if (typeof selectedActivityId === "undefined") {
      return;
    }
    const response = await addNewSession({
      activity_id: selectedActivityId,
      ...data,
    });
    console.log("handlesubmit", response);
  };

  useEffect(() => {
    const value = activity?.duration ? activity?.duration.toString() : "";
    setValue("duration", value);
  }, [activity]);

  if (isFetching || isLoading) {
    return <Loader />;
  }

  if (selectedActivityId === undefined) {
    return null;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>update activiy - {activity?.name}</FormTitle>
        <div>
          <label htmlFor="date" />
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <DatePicker id="date" {...field} />}
          />

          <Controller
            name="duration"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                label="duration"
                type="number"
                min={0}
                id="duration"
                placeholder="3"
                {...field}
              ></Input>
            )}
          />
        </div>

        <div>
          <Controller
            name="note"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                label="note"
                id="note"
                placeholder="note - today I dropped the mini - I was scared because people were watching but ended up dropping - difference with previous session = dropped alone compare to drop with people (courage+)"
                {...field}
              ></TextArea>
            )}
          />
        </div>

        <div>
          <Controller
            name="improvement"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                label="improvement"
                id="improvement"
                placeholder="what did you improve"
                {...field}
              ></TextArea>
            )}
          />
        </div>

        <div>
          <Controller
            name="proud"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                label="proud"
                id="proud"
                placeholder="what are you proud of during this session"
                {...field}
              ></TextArea>
            )}
          />
        </div>

        {/* TODO: add improve low skill like fear - procrastionation.... amount of points will add skill point ~120pts (trimestre = 1 point skill) for example- limit to 1pt per day */}
        {/* separate session info from extra rpg info - coombine with focal */}
        {/*  */}
        <Button type="submit" text="log session"></Button>
      </Form>
    </>
  );
};
