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
        }),
        getSingleStudent: builder.query({
            query: (id) => {
                return {
                    url: `/students/${id}`,
                    method: 'GET'
                }
            }
        }),
        createFaculty: builder.mutation({
            query: (data) =>{
                return {
                    url: `/users/create-faculty`,
                    method: 'POST',
                    body: data,
                }
            }
        })
    }),
})


export default userManagementApi;