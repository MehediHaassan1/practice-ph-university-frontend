import { TQueryParams } from "../../../types/global.types";
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
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: '/students',
                    method: 'GET',
                    params: params,
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
                    body: { student: studentInfo.student },
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
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: '/faculties',
                    method: 'GET',
                    params: params,
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
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: '/admins',
                    method: 'GET',
                    params: params,
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