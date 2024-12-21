import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // the fetchBaseQuery is used to get data from backend
import { BASE_URL } from "../constants";

const baseQueryy = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery: baseQueryy,
  tagTypes: ["Product", "Order", "User"], // these are used to define the types of data we are fetching from the backend.
  endpoints: (builder) => ({}),
});
