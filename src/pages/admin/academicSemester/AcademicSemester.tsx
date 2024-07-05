import academicSemesterApi from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
    const { data } =
        academicSemesterApi.useGetAllAcademicSemesterQuery(undefined);

    console.log(data);
    return (
        <div>
            <h1>This is AcademicSemester component.</h1>
        </div>
    );
};

export default AcademicSemester;
