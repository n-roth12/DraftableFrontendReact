import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation
} = authApiSlice