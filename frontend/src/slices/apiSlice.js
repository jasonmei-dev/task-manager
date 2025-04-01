import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // RTK Query

const baseQuery = fetchBaseQuery({ baseUrl: '' }); // baseUrl is empty string because we're using a proxy in vite.config.js

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], // add tasklists here too
  endpoints: (builder) => ({}),
});
