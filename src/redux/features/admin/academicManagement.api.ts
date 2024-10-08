import { TAcademicSemester, TQueryParams, TResponseRedux } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi"

const academicManagementApi = baseApi.injectEndpoints(
    {
        endpoints: (builder) => ({
            getAllAcademicSemester: builder.query({
                query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                        args.forEach((item: TQueryParams) => {
                            params.append(item.name, item.value as string)
                        })
                    }
                    return {
                        url: '/academic-semesters',
                        method: 'GET',
                        params: params,
                    }
                },
                transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                    const data = {
                        data: response.data,
                        meta: response.meta,
                    }
                    return data;
                },
                providesTags: ['academicManagement']
            }),
            createAcademicSemester: builder.mutation({
                query: (data) => {
                    return {
                        url: '/academic-semesters/create-academic-semester',
                        method: 'POST',
                        body: data,
                    }
                },
                invalidatesTags: ['academicManagement']
            }),
            createAcademicFaculty: builder.mutation({
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
            }),
        }),
    }
)

export default academicManagementApi;