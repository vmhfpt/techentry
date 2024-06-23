import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '../../../../api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'categoriesApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Categories']});


export const categoriesApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'category',
      providesTags: (result) =>
      result
        ? [
            ...result.data.map(({ id } : {id : number | string}) => ({ type: 'Categories' as const, id })),
            { type: 'Categories', id: 'LIST' },
          ]
        : [{ type: 'Categories', id: 'LIST' }],
    }),
    getCategory: builder.query({
      query: (id) => `category/${id}`,
      providesTags: (id) => [{ type: 'Categories', id }],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        
        url: 'category/create',
        method: 'POST',
        body: newCategory,
        formData: true,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    updateCategory: builder.mutation({
      query: (updatedCategory) => ({
        url: `category/${updatedCategory.id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: (id) => [{ type: 'Categories', id },  { type: 'Categories', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation
} = categoriesApi;