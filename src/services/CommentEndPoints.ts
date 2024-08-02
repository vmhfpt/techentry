import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '@/api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'commentsApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Comments']});
export const CommentsApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id) => `comment/products/${id}/comments`,
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id } : {id : number | string}) => ({ type: 'Comments' as const, id })),
            { type: 'Comments', id: 'LIST' },
          ]
        : [{ type: 'Comments', id: 'LIST' }],
    }),
    postComment: builder.mutation({
      query: (payload) => ({
        url: 'comment',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
  
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  usePrefetch,
  useDeleteCommentMutation,
  usePostCommentMutation
} = CommentsApi;