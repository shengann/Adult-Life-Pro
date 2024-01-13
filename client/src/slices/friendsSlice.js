import { apiSlice } from './apiSlice';

export const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query({
            query: () => ({
                url: 'api/v1/friends',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Friends'],
        }),
        getFriendsDetails: builder.query({
            query: (friendId) => ({
                url: `api/v1/friends/${friendId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        addFriends: builder.mutation({
            query: (data) => ({
                url: 'api/v1/friends',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Friends'],
        }),
        updateFriends: builder.mutation({
            query: (data) => ({
                url: `api/v1/friends/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Friends'],
        }),
        deleteFriends: builder.mutation({
            query: (friendId) => ({
                url: `api/v1/friends/${friendId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Friends'],
        }),
        getPayable: builder.query({
            query: () => ({
                url: 'api/v1/friends/payable',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Friends'],
        }),
        getReceivable: builder.query({
            query: () => ({
                url: 'api/v1/friends/receivable',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Friends'],
        }),
        getFriendDetails: builder.query({
            query: (friendId) => ({
                url: `api/v1/friends/detail/${friendId}`,
            }),
            keepUnusedDataFor: 0,
            providesTags: ['Friends'],
        }),
    }),
});

export const {
    useGetFriendsQuery,
    useGetFriendsDetailsQuery,
    useAddFriendsMutation,
    useUpdateFriendsMutation,
    useDeleteFriendsMutation,
    useGetPayableQuery,
    useGetReceivableQuery,
    useGetFriendDetailsQuery
} = friendsApiSlice;