
import { apiSlice } from '../api/apiSlice';

export const checkoutApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: '/create-order',
        method: 'POST',
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});


export const {useCheckoutMutation} = checkoutApi;
