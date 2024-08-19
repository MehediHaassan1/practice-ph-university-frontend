import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints(
    {
        endpoints: (builder) => ({
            login: builder.mutation({
                query: (userInfo) => {
                    return {
                        url: '/auth/login',
                        method: 'POST',
                        body: userInfo,
                    }
                }
            }),
            changePassword: builder.mutation({
                query: (payload) => {
                    return {
                        url: '/auth/change-password',
                        method: 'POST',
                        body: payload
                    }
                }
            })
        }),
    }
)

export const { useLoginMutation, useChangePasswordMutation } = authApi;