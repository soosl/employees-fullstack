import { ResponseUser, UserData } from 'interfaces/User.interface';
import { api } from './api';

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<ResponseUser, UserData>({
            query: userData => ({
                url: '/users/login',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
        register: builder.mutation<ResponseUser, UserData>({
            query: userData => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
        }),
        current: builder.query<ResponseUser, void>({
            query: () => ({
                url: '/users/current',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery, useLogoutMutation } = authApi;
export const { current, login, register } = authApi.endpoints;
