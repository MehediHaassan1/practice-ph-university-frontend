/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";

interface DefinitionType {
    data: {
        message: string;
    };
}

// Type guard to check if an object is a `DefinitionType`
function isDefinitionType(error: any): error is DefinitionType {
    return (error as DefinitionType).data !== undefined;
}


const SemesterRegistration = () => {
    const [createSemesterRegistration] =
        courseManagementApi.useCreateSemesterRegistrationMutation();
    const { data: academicSemesters, isLoading } =
        academicManagementApi.useGetAllAcademicSemesterQuery([
            { name: "sort", value: "year" },
        ]);

    if (isLoading) return <div>Loading...</div>;

    const academicSemestersOptions = academicSemesters?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating ...");

        try {
            const res = await createSemesterRegistration({
                ...data,
                minCredit: Number(data.minCredit),
                maxCredit: Number(data.maxCredit),
            });
            if (isDefinitionType(res.error)) {
                console.log(res.error)
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res?.data?.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };
    const statusOptions = [
        {
            value: "UPCOMING",
            label: "Upcoming",
        },
        {
            value: "ONGOING",
            label: "Ongoing",
        },
        {
            value: "ENDED",
            label: "Ended",
        },
    ];

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm onSubmit={onSubmit}>
                    <PhSelect
                        name="academicSemester"
                        label="Academic Semester"
                        options={academicSemestersOptions!}
                    />
                    <PhSelect
                        name="status"
                        label="Status"
                        options={statusOptions}
                    />
                    <PHDatePicker name="startDate" label="Start Date" />
                    <PHDatePicker name="endDate" label="End Date" />
                    <PHInput
                        name="minCredit"
                        label="Min Credit"
                        type="number"
                    />
                    <PHInput
                        name="maxCredit"
                        label="Max Credit"
                        type="number"
                    />

                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;
