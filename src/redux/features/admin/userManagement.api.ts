import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation({
            query: (payload) => {
                return {
                    url: '/users/create-student',
                    method: 'POST',
                    body: payload,
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
        updateStudent: builder.mutation({
            query: ({ id, studentInfo }) => {
                console.log(studentInfo.student)
                return {
                    url: `/students/${id}`,
                    method: 'PATCH',
                    body: {student: studentInfo.student},
                }
            }
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
            query: (payload) => {
                return {
                    url: `/users/create-faculty`,
                    method: 'POST',
                    body: payload,
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
        }),
        getSingleFaculty: builder.query({
            query: (id) => {
                return {
                    url: `/faculties/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['userManagement']
        }),
        createAdmin: builder.mutation({
            query: (payload) => {
                return {
                    url: `/users/create-admin`,
                    method: 'POST',
                    body: payload
                }
            },
            invalidatesTags: ['userManagement']
        }),
        getAllAdmin: builder.query({
            query: () => {
                return {
                    url: '/admins',
                    method: 'GET',
                }
            },
            providesTags: ['userManagement']
        }),
        getSingleAdmin: builder.query({
            query: (id) => {
                return {
                    url: `/admins/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['userManagement']
        })
    }),
})


export default userManagementApi;