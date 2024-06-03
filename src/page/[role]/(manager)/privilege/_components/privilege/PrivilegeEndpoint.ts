import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '@/api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'privilegeApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Privilege']});
export const privilegeApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getPrivileges: builder.query({
      query: () => 'privileges?_expand=privilege_group',
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id } : {id : number | string}) => ({ type: 'Privilege' as const, id })),
            { type: 'Privilege', id: 'LIST' },
          ]
        : [{ type: 'Privilege', id: 'LIST' }],
    }),
    getPrivilege: builder.query({
      query: (id) => `privileges/${id}`,
      providesTags: (id) => [{ type: 'Privilege', id }],
    }),
    createPrivilege: builder.mutation({
      query: (newprivilegeGroups) => ({
        url: 'privileges',
        method: 'POST',
        body: newprivilegeGroups,
      }),
      invalidatesTags: [{ type: 'Privilege', id: 'LIST' }],
    }),
    updatePrivilege: builder.mutation({
      query: (updatedprivilegeGroups) => ({
        url: `privileges/${updatedprivilegeGroups.id}`,
        method: 'PUT',
        body: updatedprivilegeGroups,
      }),
      invalidatesTags: (id) => [{ type: 'Privilege', id },  { type: 'Privilege', id: 'LIST' }],
    }),
    deletePrivilege: builder.mutation({
      query: (id) => ({
        url: `privileges/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Privilege', id: 'LIST' }],
    }),
  }),
});

export const {
   useGetPrivilegesQuery,
   useGetPrivilegeQuery,
   useCreatePrivilegeMutation,
   useDeletePrivilegeMutation,
   useUpdatePrivilegeMutation
} = privilegeApi;