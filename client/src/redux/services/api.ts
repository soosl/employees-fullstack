import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders(headers, api) {
        const token = localStorage.getItem('token') || (api.getState() as RootState).auth.user?.token;

        if (!token) return;

        headers.set('authorization', `Bearer ${token}`);
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: retry(baseQuery, { maxRetries: 1 }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
