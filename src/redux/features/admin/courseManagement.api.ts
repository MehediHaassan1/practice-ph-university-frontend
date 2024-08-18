// import { TAcademicSemester, TQueryParams, TResponseRedux } from "../../../types/global.types";
import { TRegisteredSemester } from "../../../types/courseManagement.types";
import { TQueryParams, TResponseRedux } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi"

const courseManagementApi = baseApi.injectEndpoints(
    {
        endpoints: (builder) => ({

            createSemesterRegistration: builder.mutation({
                query: (data) => {
                    return {
                        url: '/semester-registrations/create-semester-registration',
                        method: 'POST',
                        body: data,
                    }
                },
                invalidatesTags: ['coursesManagement']
            }),
            getAllRegisteredSemesters: builder.query({
                query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                        args.forEach((item: TQueryParams) => {
                            params.append(item.name, item.value as string)
                        })
                    }
                    return {
                        url: '/semester-registrations',
                        method: 'GET',
                        params: params,
                    }
                },
                transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
                    const data = {
                        data: response.data,
                        meta: response.meta,
                    }
                    return data;
                },
                providesTags: ['coursesManagement']
            }),
            updateRegSemesterStatus: builder.mutation({
                query: (args) => {
                    return {
                        url: `/semester-registrations/${args.id}`,
                        method: 'PATCH',
                        body: args.data,
                    }
                },
                invalidatesTags: ['coursesManagement']
            }),
            /* createAcademicFaculty: builder.mutation({
                query: (data) => {
                    return {
                        url: '/academic-faculties/create-academic-faculty',
                        method: 'POST',
                        body: data,
                    }
                },
                invalidatesTags: ['academicManagement']
            }),
            getAllAcademicFaculty: builder.query({
                query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                        args.forEach((item: TQueryParams) => {
                            params.append(item.name, item.value as string)
                        })
                    }
                    return {
                        url: '/academic-faculties',
                        method: 'GET',
                        params: params,
                    }
                },
                providesTags: ['academicManagement']
            }),
            createDepartment: builder.mutation({
                query: (data) => {
                    return {
                        url: '/academic-departments/create-academic-department',
                        method: 'POST',
                        body: data,
                    }
                },
                invalidatesTags: ['academicManagement']
            }),
            getAllDepartment: builder.query({
                query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                        args.forEach((item: TQueryParams) => {
                            params.append(item.name, item.value as string)
                        })
                    }
                    return {
                        url: '/academic-departments',
                        method: 'GET',
                        params: params,
                    }
                },
                providesTags: ['academicManagement']
            }), */
        }),
    }
)

export default courseManagementApi;