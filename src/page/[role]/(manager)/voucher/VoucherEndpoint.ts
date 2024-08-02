import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiConfig } from '../../../../api/baseApiConfig';

const emptySplitApi = createApi({
    reducerPath: 'voucherApi',
    ...baseApiConfig
  });
const apiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['voucherApi']});
export const voucherApi = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getVouchers: builder.query({
      query: () => 'coupon',
      providesTags: (result) =>
      result
        ? [
            ...result?.data.map(({ id } : {id : number | string}) => ({ type: 'coupons' as const, id })),
            { type: 'voucherApi', id: 'LIST' },
          ]
        : [{ type: 'voucherApi', id: 'LIST' }],
    }),
    getVoucher: builder.query({
      query: (id) => `coupon/${id}`,
      providesTags: (id) => [{ type: 'voucherApi', id }],
    }),
    createVoucher: builder.mutation({
      query: (newUser) => ({
        url: 'coupon',
        method: 'POST',
        body: newUser,
      
      }),
      invalidatesTags: [{ type: 'voucherApi', id: 'LIST' }],
    }),
    updateVoucher: builder.mutation({
      query: (payload) => ({
        url: `coupon/${payload.id}`,
        method: 'POST',
        body: payload.data,
    
      }),
      invalidatesTags: (id) => [{ type: 'voucherApi', id },  { type: 'voucherApi', id: 'LIST' }],
    }),
    deleteVoucher: builder.mutation({
      query: (id) => ({
        url: `coupon/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'voucherApi', id: 'LIST' }],
    }),
    checkVoucher: builder.mutation({
        query: (code) => ({
          url: `coupon/apply`,
          method: 'POST',
          body: {code : code}
        }),
        invalidatesTags: [{ type: 'voucherApi', id: 'LIST' }],
      }),
  }),
});

export const {
  useCreateVoucherMutation,
  useDeleteVoucherMutation,
  useGetVoucherQuery,
  useGetVouchersQuery,
  useUpdateVoucherMutation,
  useCheckVoucherMutation
} = voucherApi;