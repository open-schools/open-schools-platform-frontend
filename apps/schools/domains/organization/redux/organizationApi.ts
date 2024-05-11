import { commonApi, providesList } from '@store/commonApi'
import { ReturnedData } from '../../common/redux/interfaces'
import {
    CreateOrganizationData,
    AllOrganizationsData,
    AllStudentsData,
    StudentData,
    TeacherData,
    DeleteOrganizationData,
    AnalyticsData,
    ExportStudentsData,
    AllQueriesData,
    AllTeachersData,
    AllQueriesOfOrganizationData,
    getAllStudentInvitationsData,
    GetOrganizationCircleList,
    GetOrganizationCircleListData,
    GetCurrentCircleData,
    AllStudentJoinCircleQueriesData,
} from './interfaces'
import { GetEmployee } from '../../employee/redux/interfaces'
import {
    CreateOrganizationInviteEmployee,
    GetAnalytics,
    GetAnalyticsData,
    GetCircleInviteStudent,
    GetOrganizationInviteEmployee,
    GetOrganizationSender,
    GetQueryStatus,
    GetStudent,
    GetStudentJoinCircle,
    GetTeacher,
    UpdateOrganizationInviteEmployee,
} from '@domains/common/redux/serializers'
import { GetTicket, GetTicketData, GetTicketsData } from '@domains/ticket/redux/serializers'

const organizationApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOrganizations: build.query<ReturnedData<GetOrganizationSender[]>, AllOrganizationsData>({
            query: (params) => ({
                url: '/organization-management/organizations',
                method: 'GET',
                params: params,
            }),
        }),
        createOrganization: build.mutation<{ creator_employee: GetEmployee }, CreateOrganizationData>({
            query: (data) => ({
                url: '/organization-management/organizations',
                method: 'POST',
                body: data,
            }),
        }),
        updateInviteEmployee: build.mutation<
            { query: GetOrganizationInviteEmployee },
            UpdateOrganizationInviteEmployee
        >({
            query: (data) => ({
                url: '/organization-management/organizations/invite-employee',
                method: 'PATCH',
                body: data,
            }),
        }),
        getAllStudents: build.query<ReturnedData<GetStudent[]>, AllStudentsData>({
            query: (params) => ({
                url: '/organization-management/organizations/students',
                method: 'GET',
                params: params,
            }),
            providesTags: (result) => providesList(result?.results, 'Student'),
        }),
        getAllCircles: build.query<ReturnedData<GetOrganizationCircleList[]>, GetOrganizationCircleListData>({
            query: (params) => ({
                url: `/organization-management/organizations/${params.organization_id}/circles`,
                method: 'GET',
                params: params,
            }),
            providesTags: (result) => providesList(result?.results, 'Circle'),
        }),
        getCurrentCircle: build.query<{ circle: GetOrganizationCircleList }, GetCurrentCircleData>({
            query: (params) => ({
                url: `/organization-management/organizations/${params.organization_id}/circles/${params.circle_id}`,
                method: 'GET',
                params: params,
            }),
            providesTags: (result, error, arg) => [{ type: 'Student', id: arg.circle_id }],
        }),
        getStudent: build.query<{ student: GetStudent }, StudentData>({
            query: (data) => ({
                url: `/organization-management/organizations/students/${data.student_id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'Student', id: arg.student_id }],
        }),
        getTeacher: build.query<{ teacher: GetTeacher }, TeacherData>({
            query: (data) => ({
                url: `/organization-management/organizations/teachers/${data.teacher_id}`,
                method: 'GET',
                body: data,
            }),
        }),
        deleteOrganization: build.mutation<{}, DeleteOrganizationData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}`,
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ['Organization'],
        }),
        analytics: build.query<{ analytics: GetAnalytics }, AnalyticsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/analytics`,
                method: 'GET',
                body: data,
            }),
            providesTags: ['StudentJoinCircleQuery'],
        }),
        inviteEmployee: build.mutation<{ query: GetQueryStatus }, CreateOrganizationInviteEmployee>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/invite-employee`,
                method: 'POST',
                body: data,
            }),
        }),
        getAllQueries: build.query<{ results: GetOrganizationInviteEmployee }, AllQueriesData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/invite-employee-queries`,
                method: 'GET',
                body: data,
            }),
        }),
        exportStudents: build.query<{ file: File }, ExportStudentsData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/students/export`,
                method: 'GET',
                body: data,
            }),
            providesTags: ['Student'],
        }),
        getAllTeachers: build.query<ReturnedData<GetTeacher>, AllTeachersData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization_id}/teachers`,
                method: 'GET',
                body: data,
            }),
        }),
        getAllQueriesOfOrganization: build.query<ReturnedData<GetStudentJoinCircle[]>, AllQueriesOfOrganizationData>({
            query: (data) => ({
                url: `/organization-management/organizations/${data.organization}/student-profiles/${data.student_profile}/queries`,
                method: 'GET',
                body: data,
            }),
            providesTags: (result) => providesList(result?.results, 'StudentJoinCircleQuery'),
        }),
        getAllStudentInvitations: build.query<ReturnedData<GetCircleInviteStudent[]>, getAllStudentInvitationsData>({
            query: (params) => ({
                url: '/organization-management/organizations/students-invitations',
                method: 'GET',
                params: params,
            }),
            providesTags: (result) => providesList(result?.results, 'Student'),
        }),
        getAllJoinCircleQueries: build.query<ReturnedData<GetStudentJoinCircle[]>, AllStudentJoinCircleQueriesData>({
            query: (params) => ({
                url: '/organization-management/organizations/student-join-circle-query',
                method: 'GET',
                params: params,
            }),
            providesTags: (result) => providesList(result?.results, 'StudentJoinCircleQuery'),
        }),
        getOrganizationAnalytics: build.query<{ analytics: GetAnalytics }, GetAnalyticsData>({
            query: (params) => ({
                url: `/organization-management/organizations/${params.organization_id}/analytics`,
                method: 'GET',
                params: params,
            }),
            providesTags: ['StudentJoinCircleQuery'],
        }),
        getTicketsAnalytics: build.query<{ 'ticket-analytics': GetAnalytics }, GetAnalyticsData>({
            query: (params) => ({
                url: `/organization-management/organizations/${params.organization_id}/ticket-analytics`,
                method: 'GET',
                params: params,
            }),
            providesTags: ['Ticket'],
        }),
        getAllTickets: build.query<ReturnedData<GetTicket[]>, GetTicketsData>({
            query: (params) => ({
                url: `/organization-management/organizations/${params.organization_id}/family-tickets`,
                method: 'GET',
                params: params,
            }),
            providesTags: ['Ticket'],
        }),
        getTicket: build.query<{ ticket: GetTicket }, GetTicketData>({
            query: (params) => ({
                url: `/organization-management/organizations/${params.organization_id}/family-tickets/${params.ticket_id}`,
                method: 'GET',
                params: params,
            }),
            providesTags: ['Ticket'],
        }),
    }),
})

export const {
    useGetAllOrganizationsQuery,
    useCreateOrganizationMutation,
    useUpdateInviteEmployeeMutation,
    useGetCurrentCircleQuery,
    useGetAllStudentsQuery,
    useGetStudentQuery,
    useGetTeacherQuery,
    useDeleteOrganizationMutation,
    useAnalyticsQuery,
    useInviteEmployeeMutation,
    useGetAllQueriesQuery,
    useExportStudentsQuery,
    useGetAllTeachersQuery,
    useGetAllQueriesOfOrganizationQuery,
    useLazyGetAllStudentInvitationsQuery,
    useGetAllStudentInvitationsQuery,
    useGetAllCirclesQuery,
    useGetAllJoinCircleQueriesQuery,
    useGetOrganizationAnalyticsQuery,
    useGetTicketsAnalyticsQuery,
    useGetAllTicketsQuery,
    useGetTicketQuery,
} = organizationApi
