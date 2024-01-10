import { apiSlice } from './apiSlice';

export const expensesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query({
            query: () => ({
                url: 'api/v1/expenses',
            }),
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
            providesTags: ['Expenses'],
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