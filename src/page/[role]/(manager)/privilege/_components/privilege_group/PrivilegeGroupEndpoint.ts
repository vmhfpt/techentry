import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '@/api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'privilegeGroupApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['PrivilegeGroups']});
export const privilegeGroupApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getPrivilegeGroups: builder.query({
      query: () => 'privilege_groups?_embed=privileges',
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id } : {id : number | string}) => ({ type: 'PrivilegeGroups' as const, id })),
            { type: 'PrivilegeGroups', id: 'LIST' },
          ]
        : [{ type: 'PrivilegeGroups', id: 'LIST' }],
    }),
    getPrivilegeGroup: builder.query({
      query: (id) => `privilege_groups/${id}`,
      providesTags: (id) => [{ type: 'PrivilegeGroups', id }],
    }),
    createPrivilegeGroup: builder.mutation({
      query: (newprivilegeGroups) => ({
        url: 'privilege_groups',
        method: 'POST',
        body: newprivilegeGroups,
      }),
      invalidatesTags: [{ type: 'PrivilegeGroups', id: 'LIST' }],
    }),
    updatePrivilegeGroup: builder.mutation({
      query: (updatedprivilegeGroups) => ({
        url: `privilege_groups/${updatedprivilegeGroups.id}`,
        method: 'PUT',
        body: updatedprivilegeGroups,
      }),
      invalidatesTags: (id) => [{ type: 'PrivilegeGroups', id },  { type: 'PrivilegeGroups', id: 'LIST' }],
    }),
    deletePrivilegeGroup: builder.mutation({
      query: (id) => ({
        url: `privilege_groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'PrivilegeGroups', id: 'LIST' }],
    }),
  }),
});

export const {
   useGetPrivilegeGroupQuery,
   useGetPrivilegeGroupsQuery,
   useCreatePrivilegeGroupMutation,
   useDeletePrivilegeGroupMutation,
   useUpdatePrivilegeGroupMutation
} = privilegeGroupApi;