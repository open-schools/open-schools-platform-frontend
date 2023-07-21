import { commonApi } from '../../../store/commonApi'
import { ReturnedData } from '../../common/redux/interfaces'
import {
    createOrganizationData,
    CreateOrganizationResponse,
    AllOrganizationsData,
    AllOrganizationsResponse,
    StudentJoinCircleResponse,
    UpdateInviteEmployeeData,
    UpdateInviteEmployeeResponse,
    AllStudentsResponse,
    StudentJoinCircleData,
    AllStudentsData,
    StudentResponse,
    StudentData,
    TeacherResponse,
    TeacherData,
    DeleteOrganizationData,
    AnalyticsResponse,
    AnalyticsData,
    InviteEmployeeResponse,
    InviteEmployeeData,
    AllQueriesResponse,
    ExportStudentsData,
    AllQueriesData,
    ExportStudentsResponse,
    AllTeachersResponse,
    AllTeachersData,
    AllQueriesOfOrganizationResponse,
    AllQueriesOfOrganizationData,
} from './interfaces'

const organizationApi = commonApi.injectEndpoints({
    endpoints: build => ({
        getAllOrganizations: build.query<ReturnedData<AllOrganizationsResponse>, AllOrganizationsData>({
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
        getStudent: build.query<StudentResponse, StudentData>({
            query: (data) => ({
                url: `/organization-management/organizations/students/${data.student_id}`,
                method: 'GET',
                body: data,
            }),
        }),
        getTeacher: build.query<TeacherResponse, TeacherData>({
            query: (data) => ({
                url: `/organization-management/organizations/teachers/${data.teacher_id}`,
                method: 'GET',
                body: data,
            }),
        }),
        deleteOrganization: build.query<{}, DeleteOrganizationData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}`,
                method: 'DELETE',
                body: data,
            }),
        }),
        analytics: build.query<AnalyticsResponse, AnalyticsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/analytics`,
                method: 'GET',
                body: data,
            }),
        }),
        inviteEmployee: build.mutation<InviteEmployeeResponse, InviteEmployeeData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/invite-employee`,
                method: 'POST',
                body: data,
            }),
        }),
        getAllQueries: build.query<AllQueriesResponse, AllQueriesData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/invite-employee-queries`,
                method: 'GET',
                body: data,
            }),
        }),
        exportStudents: build.query<ExportStudentsResponse, ExportStudentsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/students/export`,
                method: 'GET',
                body: data,
            }),
        }),
        getAllTeachers: build.query<ReturnedData<AllTeachersResponse>, AllTeachersData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/teachers`,
                method: 'GET',
                body: data,
            }),
        }),
        // eslint-disable-next-line no-undef
        getAllQueriesOfOrganization: build.query<ReturnedData<AllQueriesOfOrganizationResponse>, AllQueriesOfOrganizationData>({
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
