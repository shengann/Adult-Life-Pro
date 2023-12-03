import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '',
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Expenses'],
    endpoints: (builder) => ({})
});