

import { createApi} from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '../../../../../../api/baseApiConfig';
const emptySplitApi = createApi({
    reducerPath: 'categoryAttributesApi',
    ...baseApiConfig
  });

const apiWithTag = emptySplitApi.enhanceEndpoints({ addTagTypes: ['CategoryAttributes']});
export const categoryAttributesApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getCategoriesAttributes: builder.query({
        
      query: () => ({
         url : 'category_attributes?_expand=attribute&_expand=category',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number | string }) => ({ type: 'CategoryAttributes' as const, id })),
              { type: 'CategoryAttributes', id: 'LIST' }
            ]
          : [{ type: 'CategoryAttributes', id: 'LIST' }]
    }),
    getCategoryAttributes: builder.query({
      query: (id) => `category_attributes?categoryId=${id}&_expand=attribute&_expand=category`,
      providesTags: (id) => [{ type: 'CategoryAttributes', id }]
    }),
    createCategoryAttributes: builder.mutation({
      query: (newAttribute) => ({
        url: 'category_attributes',
        method: 'POST',
        body: newAttribute
      }),
      invalidatesTags: [{ type: 'CategoryAttributes', id: 'LIST' }]
    }),
    deleteCategoryAttributes : builder.mutation({
      query: (id) => ({
        url: `category_attributes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'CategoryAttributes', id: 'LIST' }]
    })
  })
})

export const { 
  useGetCategoryAttributesQuery,
  useGetCategoriesAttributesQuery,
  useCreateCategoryAttributesMutation,
  useDeleteCategoryAttributesMutation
} = categoryAttributesApi;

