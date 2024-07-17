import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({ required_error: "Please select a semester" }),
    year: z.string({ required_error: "Please select a year" }),
    startMonth: z.string({ required_error: "Please select a start month" }),
    endMonth: z.string({ required_error: "Please select a end month" }),
});

export const academicFacultySchema = z.object({
    name: z.string({ required_error: 'Add a name to create a faculty' })
})

export const academicDepartmentSchema = z.object({
    name: z.string({ required_error: 'Add a name to create a department' }),
    academicFaculty: z.string({ required_error: 'Please select a faculty!' })
})