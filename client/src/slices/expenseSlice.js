import { apiSlice } from './apiSlice';

export const expensesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query({
            query: ({ query }) => {
                const queryParams = {}
                const { date } = query;
                if (date) {
                    queryParams.date = date;
                }
                const url = Object.keys(queryParams).length > 0
                    ? `api/v1/expenses/?${new URLSearchParams(queryParams)}`
                    : 'api/v1/expenses';

                return {
                    url,
                };
            },
            keepUnusedDataFor: 5,
            providesTags: ['Expenses'],
        }),
        getExpenseDetails: builder.query({
            query: (expenseId) => ({
                url: `api/v1/expenses/${expenseId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        addExpense: builder.mutation({
            query: (data) => ({
                url: 'api/v1/expenses',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Expenses'],
        }),
        updateExpense: builder.mutation({
            query: (data) => ({
                url: `api/v1/expenses/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Expenses'],
        }),
        deleteExpense: builder.mutation({
            query: (expenseId) => ({
                url: `api/v1/expenses/${expenseId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Expenses'],
        })
    }),
});

export const {
    useGetExpensesQuery,
    useGetExpenseDetailsQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation

} = expensesApiSlice;