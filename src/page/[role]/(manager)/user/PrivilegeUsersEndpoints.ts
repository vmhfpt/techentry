import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '../../../../api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'privilegeUsersApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['PrivilegeUsers']});
export const privilegeUsersApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
  
    getPrivilegeUser: builder.query({
      query: (id) => `privilege_users?userId=${id}`,
      providesTags: (id) => [{ type: 'PrivilegeUsers', id }],
    }),
    createPrivilegeUser: builder.mutation({
      query: (newItem) => ({
        url: 'privilege_users',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: [{ type: 'PrivilegeUsers', id: 'LIST' }],
    }),
    deletePrivilegeUser: builder.mutation({
      query: (id : number | string) => ({
        url: `privilege_users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'PrivilegeUsers', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPrivilegeUserQuery,
  useDeletePrivilegeUserMutation,
  useCreatePrivilegeUserMutation
} = privilegeUsersApi;