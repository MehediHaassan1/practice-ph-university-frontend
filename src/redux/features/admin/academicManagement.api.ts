import { TAcademicSemester, TQueryParams, TResponseRedux } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi"

const academicManagementApi = baseApi.injectEndpoints(
    {
        endpoints: (builder) => ({
            getAllAcademicSemester: builder.query({
                query: (args) => {
                    const params = new URLSearchParams();
                    if (args) {
                        args.forEach((item:TQueryParams) => {
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
            }),
            createAcademicSemester: builder.mutation({
                query: (data) => {
                    return {
                        url: '/academic-semesters/create-academic-semester',
                        method: 'POST',
                        body: data,
                    }
                }
            }),
        }),
    }
)

export default academicManagementApi;