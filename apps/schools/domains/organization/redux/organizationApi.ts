import { commonApi } from '../../../store/commonApi'

const organizationApi = commonApi.injectEndpoints({
    endpoints: build => ({
        getAllOrganizations: build.query<ReturnedData<Organization>, AllOrganizationsData>({
            query: (data) => ({
                url: '/organization-management/organizations',
                method: 'GET',
                body: data,
            }),
        }),
        createOrganization: build.mutation<CreateOrganizationResponse, createOrganizationData>({
            query: (data) => ({
                url: '/organization-management/organizations',
                method: 'POST',
                body: data,
            }),
        }),
        updateInviteEmployee: build.mutation<UpdateInviteEmployeeResponse, UpdateInviteEmployeeData>({
            query: (data) => ({
                url: '/organization-management/organizations/invite-employee',
                method: 'PATCH',
                body: data,
            }),
        }),
        studentJoinCircle: build.query<StudentJoinCircleResponse, StudentJoinCircleData>({
            query: (data) => ({
                url: '/organization-management/organizations/student-join-circle-query',
                method: 'GET',
                body: data,
            }),
        }),
        getAllStudents: build.query<AllStudentsResponse, AllStudentsData>({
            query: (data) => ({
                url: '/organization-management/organizations/students',
                method: 'GET',
                body: data,
            }),
        }),
        getStudent: build.query<StudentResponse, Id>({
            query: (data) => ({
                url: `/organization-management/organizations/students/${data.id}`,
                method: 'GET',
                body: data,
            }),
        }),
        getTeacher: build.query<TeacherResponse, Id>({
            query: (data) => ({
                url: `/organization-management/organizations/teachers/${data.id}`,
                method: 'GET',
                body: data,
            }),
        }),
        deleteOrganization: build.query<{}, Id>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.id}`,
                method: 'DELETE',
                body: data,
            }),
        }),
        analytics: build.query<AnalyticsResponse, AnalyticsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.id}/analytics`,
                method: 'GET',
                body: data,
            }),
        }),
        inviteEmployee: build.mutation<InviteEmployeeResponse, InviteEmployeeData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.id}/invite-employee`,
                method: 'POST',
                body: data.employee_invite,
            }),
        }),
        getAllQueries: build.query<AllQueriesResponse, Id>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.id}/invite-employee-queries`,
                method: 'GET',
                body: data,
            }),
        }),
        exportStudents: build.query<ExportStudentsResponse, Id>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.id}/students/export`,
                method: 'GET',
                body: data,
            }),
        }),
        getAllTeachers: build.query<ReturnedData<Teacher>, AllTeachersData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/teachers`,
                method: 'GET',
                body: data,
            }),
        }),
        getAllQueriesOfOrganization: build.query<ReturnedData<StudentProfileQuery>, AllQueriesOfOrganizationData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization}/student-profiles/${data.student_profile}/queries`,
                method: 'GET',
                body: data,
            }),
        }),
    }),
})

export const {
    useGetAllOrganizationsQuery,
    useCreateOrganizationMutation,
    useUpdateInviteEmployeeMutation,
    useStudentJoinCircleQuery,
    useGetAllStudentsQuery,
    useGetStudentQuery,
    useGetTeacherQuery,
    useDeleteOrganizationQuery,
    useAnalyticsQuery,
    useInviteEmployeeMutation,
    useGetAllQueriesQuery,
    useExportStudentsQuery,
    useGetAllTeachersQuery,
    useGetAllQueriesOfOrganizationQuery,
} = organizationApi
