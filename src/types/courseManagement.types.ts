import { TAcademicSemester } from "./global.types"

export type TRegisteredSemester = {
    _id: string
    academicSemester: TAcademicSemester
    status: string
    startDate: string
    endDate: string
    minCredit: number
    maxCredit: number
    createdAt: string
    updatedAt: string
}