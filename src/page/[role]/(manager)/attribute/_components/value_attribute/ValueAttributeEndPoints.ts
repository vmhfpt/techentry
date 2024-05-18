

import { createApi} from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '../../../../../../api/baseApiConfig';
const emptySplitApi = createApi({
    reducerPath: 'valueAttributesApi',
    ...baseApiConfig
  });

const apiWithTag = emptySplitApi.enhanceEndpoints({ addTagTypes: ['ValueAttributes']});
export const valueAttributesApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getValueAttributes: builder.query({
        
      query: () => ({
         url : 'value_attributes?_expand=attribute',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number | string }) => ({ type: 'ValueAttributes' as const, id })),
              { type: 'ValueAttributes', id: 'LIST' }
            ]
          : [{ type: 'ValueAttributes', id: 'LIST' }]
    }),
    getValueAttribute: builder.query({
      query: (id) => `value_attributes/${id}`,
      providesTags: (id) => [{ type: 'ValueAttributes', id }]
    }),
    createValueAttributes: builder.mutation({
      query: (newValueAttribute) => ({
        url: 'value_attributes',
        method: 'POST',
        body: newValueAttribute
      }),
      invalidatesTags: [{ type: 'ValueAttributes', id: 'LIST' }]
    }),
    deleteValueAttributes : builder.mutation({
      query: (id) => ({
        url: `value_attributes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'ValueAttributes', id: 'LIST' }]
    })
  })
})

export const { 
    useCreateValueAttributesMutation,
    useDeleteValueAttributesMutation,
    useGetValueAttributeQuery,
    useGetValueAttributesQuery
} = valueAttributesApi;

