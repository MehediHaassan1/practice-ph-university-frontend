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
            createCourse: builder.mutation({
                query: (data) => {
                    return {
                        url: '/courses/create-course',
                        method: 'POST',
                        body: data,
                    }
                },
                invalidatesTags: ['coursesManagement']
            }),
            getAllCourses: builder.query({
                query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                        args.forEach((item: TQueryParams) => {
                            params.append(item.name, item.value as string)
                        })
                    }
                    return {
                        url: '/courses',
                        method: 'GET',
                        params: params,
                    }
                },
                providesTags: ['coursesManagement']
            }),
            assignFaculties: builder.mutation({
                query: (args) => {
                    return {
                        url: `/courses/${args.courseId}/assign-faculties`,
                        method: 'PUT',
                        body: args.data,
                    }
                },
                invalidatesTags: ['coursesManagement']
            }),
            getAllAssignedFaculties: builder.query({
                query: (args) => {
                    return {
                        url: `/courses/${args.courseId}/get-faculties`,
                        method: 'GET',
                    }
                },
                providesTags: ['coursesManagement']
            }),
            offerCourse: builder.mutation({
                query: (args) => {
                    return {
                        url: `/offered-courses/create-offered-course`,
                        method: 'POST',
                        body: args.data,
                    }
                },
                invalidatesTags: ['coursesManagement']
            }),
        }),
    }
)

export default courseManagementApi;