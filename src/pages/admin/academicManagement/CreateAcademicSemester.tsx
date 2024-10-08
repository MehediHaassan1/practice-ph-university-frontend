/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { monthOptions } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicManagement.schema";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.types";

const nameOptions = [
    {
        value: "01",
        label: "Autumn",
    },
    {
        value: "02",
        label: "Summer",
    },
    {
        value: "03",
        label: "Fall",
    },
];

const CreateAcademicSemester = () => {
    const [createAcademicSemester] =
        academicManagementApi.useCreateAcademicSemesterMutation();

    const currentYear = new Date().getFullYear();
    const years = [0, 1, 2, 3, 4];
    const yearOptions = years.map((year) => ({
        value: `${currentYear + year}`,
        label: `${currentYear + year}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating ...");
        const name = nameOptions[Number(data.name) - 1].label;
        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };
        try {
            const res = (await createAcademicSemester(
                semesterData
            )) as TResponse<undefined>;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res.data?.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicSemesterSchema)}
                >
                    <PhSelect name="name" label="Name" options={nameOptions} />
                    <PhSelect name="year" label="Year" options={yearOptions} />
                    <PhSelect
                        name="startMonth"
                        label="Start Month"
                        options={monthOptions}
                    />
                    <PhSelect
                        name="endMonth"
                        label="End Month"
                        options={monthOptions}
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
