// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Activity, Character, Session } from '../../types/types';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/v1" }),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ["Activity", "Session"],

  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getActivities: builder.query<Activity[], void>({
      query: () => "/activities",
      providesTags: ["Activity"],
    }),
    getActivity: builder.query<Activity, number>({
      query: (activityId) => `/activities/${activityId}`,
    }),
    addNewActivity: builder.mutation<
      Activity,
      { name: string; duration: number }
    >({
      query: (body) => ({
        url: "/activities",
        method: "POST",
        body: { ...body, character_id: 1 },
      }),
      invalidatesTags: ["Activity"],
    }),
    getSessions: builder.query<
      Session[],
      { activity?: number; month?: number; year?: number }
    >({
      query: ({ activity, month, year }) => ({
        url: "/sessions",
        params: { activity, month, year },
      }),
      providesTags: ["Session"],
    }),
    getSessionsByActivity: builder.query<Session[], { activityId: number }>({
      query: ({ activityId }) => ({
        url: "/sessions",
        params: { activityId },
      }),
      providesTags: ["Session"],
    }),
    addNewSession: builder.mutation<
      Session,
      {
        activity_id: number;
        date: string;
        duration: string;
        note: string;
        improvement: string;
        proud: string;
      }
    >({
      query: (body) => ({
        url: "/sessions",
        method: "POST",
        body: { ...body, character_id: 1 },
      }),
      invalidatesTags: ["Session"],
    }),
    getCharacter: builder.query<Character, void>({
      query: () => `/characters/1`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetActivitiesQuery,
  useGetActivityQuery,
  useAddNewActivityMutation,
  useGetSessionsQuery,
  useGetSessionsByActivityQuery,
  useAddNewSessionMutation,
  useGetCharacterQuery,
} = apiSlice;
