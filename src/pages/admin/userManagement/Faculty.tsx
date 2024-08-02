import userManagementApi from "../../../redux/features/admin/userManagement.api";

const Faculty = () => {
    const { data, isLoading } =
        userManagementApi.useGetAllFacultyQuery(undefined);

    if (isLoading) return <div>Loading...</div>;
    console.log(data);
    
    return (
        <div>
            <h1>This is Faculty component.</h1>
        </div>
    );
};

export default Faculty;
