import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../models/AuthResponse';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }),
  tagTypes: ['User'],
  endpoints: builder => ({
    registration: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/registration',
        method: 'POST',
        body: { email, password },
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation<void, { email: string; newPassword: string }>({
      query: ({ email, newPassword }) => ({
        url: `/${email}/update-password`,
        method: 'PATCH',
        body: { newPassword },
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } = apiSlice;
