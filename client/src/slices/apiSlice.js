import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://adult-life-pro-server.onrender.com/',
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Expenses','Friends','CashFlows'],
    endpoints: (builder) => ({})
});