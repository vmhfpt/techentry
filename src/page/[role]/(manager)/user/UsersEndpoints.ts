import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '../../../../api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'usersApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Users']});
export const usersApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id } : {id : number | string}) => ({ type: 'Users' as const, id })),
            { type: 'Users', id: 'LIST' },
          ]
        : [{ type: 'Users', id: 'LIST' }],
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `users/${updatedUser.id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: (id) => [{ type: 'Users', id },  { type: 'Users', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;