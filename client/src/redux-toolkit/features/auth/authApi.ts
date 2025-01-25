import { persistor } from "@/redux-toolkit/store";
import { apiSlice } from "../api/apiSlice";
import { userLogin, userLogout, userRegister } from "./authSlice";


type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegister({ accessToken: result.data.activationToken }));
                } catch (error: any) {
                    console.error("Error during registration:", error);
                }
            },
        }),
        activation: builder.mutation({
          query: ({ activationToken, activationCode }) => ({
            url: "activation-user",
            method: "POST",
            body: { activationToken, activationCode },
            credentials: "include" as const,
          }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLogin({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    console.error("Error during login:", error);
                }
            },
        }),
        socialAuth: builder.mutation({
          query: (data) => ({
            url: "/social-auth",
            method: "POST",
            body: data,
            credentials: "include" as const,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
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
              if (error.error) {
                console.error("Error:", error.error);
                return error.error;
              } else {
                console.error("An unknown error occurred", error);
                return { message: "An unknown error occurred" };
              }
            }
          },
        }),
        logout: builder.mutation<void, void>({
          query: () => ({
              url: "logout",
              method: "GET",
              credentials: "include" as const,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                  await queryFulfilled;
                  dispatch(userLogout());
                  // Purge the persisted state to clear localStorage
                  persistor.purge(); 
                  // Clear cookies as well
                  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  console.log("Logged out successfully.");
              } catch (error: any) {
                  console.error("Error during logout:", error);
              }
          },
      }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useActivationMutation,
    useSocialAuthMutation,
    useLogoutMutation,
} = authApi;
