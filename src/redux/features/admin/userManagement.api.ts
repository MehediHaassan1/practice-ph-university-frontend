import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation({
            query: (data) => {
                return {
                    url: '/users/create-student',
                    method: 'POST',
                    body: data,
                }
            }
        }),
        getAllStudent: builder.query({
            query: () => {
                return {
                    url: '/students',
                    method: 'GET',
                }
            }
        })
    }),
})


export default userManagementApi;