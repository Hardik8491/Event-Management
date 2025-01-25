import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin, userLogout } from "../auth/authSlice";
import { RootState } from "@/redux-toolkit/store";

// Create the base API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Refresh token endpoint
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: data.accessToken,
              user: data.user,
            })
          );
        } catch (error) {
          console.error("Failed to refresh token", error);
          dispatch(userLogout());
        }
      },
    }),

    // Load user data with automatic token refresh
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          if (error.status === 401) {
            const refreshResult = await dispatch(
              apiSlice.endpoints.refreshToken.initiate({})
            ).unwrap();
            console.log(refreshResult);
            if (!refreshResult.error) {
              // Retry loading user data after refreshing token
              dispatch(apiSlice.endpoints.loadUser.initiate({}));
            } else {
              dispatch(userLogout());
            }
          } else {
            console.error("Error loading user", error);
          }
        }
      },
    }),
  }),
});

// Export hooks for use in components
export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
