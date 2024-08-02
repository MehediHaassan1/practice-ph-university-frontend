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
            },
            invalidatesTags: ['userManagement']
        }),
        getAllStudent: builder.query({
            query: () => {
                return {
                    url: '/students',
                    method: 'GET',
                }
            },
            providesTags: ['userManagement']
        }),
        getSingleStudent: builder.query({
            query: (id) => {
                return {
                    url: `/students/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['userManagement']
        }),
        blockUser: builder.mutation({
            query: (payload) => {
                return {
                    url: `/users/change-status/${payload.id}`,
                    method: 'POST',
                    body: payload.data
                }
            },
            invalidatesTags: ['userManagement']
        }),
        createFaculty: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/create-faculty`,
                    method: 'POST',
                    body: data,
                }
            }
        }),
        getAllFaculty: builder.query({
            query: () => {
                return {
                    url: '/faculties',
                    method: 'GET'
                }
            },
            providesTags: ['userManagement']
        })
    }),
})


export default userManagementApi;