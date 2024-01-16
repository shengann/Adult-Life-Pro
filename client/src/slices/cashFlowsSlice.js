import { apiSlice } from './apiSlice';

export const cashFlowsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCashFlows: builder.query({
            query: () => ({
                url: 'api/v1/cash-flows',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['CashFlows'],
        }),
        getCashFlowDetails: builder.query({
            query: (cashFlowId) => ({
                url: `api/v1/cash-flows/${cashFlowId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        addCashFlow: builder.mutation({
            query: (data) => ({
                url: 'api/v1/cash-flows',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['CashFlows'],
        }),
        updateCashFlow: builder.mutation({
            query: (data) => ({
                url: `api/v1/cash-flows/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['CashFlows'],
        }),
        deleteCashFlow: builder.mutation({
            query: (cashFlowId) => ({
                url: `api/v1/cash-flows/${cashFlowId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CashFlows'],
        })
    }),
});

export const {
    useGetcashFlowsQuery,
    useGetCashFlowDetailsQuery,
    useAddCashFlowMutation,
    useUpdateCashFlowMutation,
    useDeleteCashFlowMutation

} = cashFlowsApiSlice;