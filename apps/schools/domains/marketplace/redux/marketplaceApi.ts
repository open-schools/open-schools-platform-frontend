import { commonApi, providesList } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import {
    GetAllAppsData,
    GetAppData,
    InstallAppData,
    UninstallAppData,
    GetAllCategoriesData,
    CreateReviewData,
    App,
    Category,
    Review,
    Installation,
    GenerateAuthCodeData,
    GenerateAuthCodeResponse,
} from './interfaces'

const marketplaceApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getAllApps: build.query<ReturnedData<App[]>, GetAllAppsData>({
            query: (params) => {
                const queryParams: Record<string, any> = {}
                if (params.category_id !== undefined) queryParams.category_id = params.category_id
                if (params.developer_profile_id) queryParams.developer_profile_id = params.developer_profile_id
                if (params.sort) queryParams.sort = params.sort
                if (params.q) queryParams.q = params.q
                if (params.page) queryParams.page = params.page
                if (params.page_size) queryParams.page_size = params.page_size

                return {
                    url: '/marketplace-management/marketplace/apps',
                    method: 'GET',
                    params: queryParams,
                }
            },
            providesTags: (result) => providesList(result?.results, 'App'),
        }),
        getApp: build.query<App, GetAppData>({
            query: (data) => ({
                url: `/marketplace-management/marketplace/apps/${data.app_id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'App', id: arg.app_id }],
        }),
        installApp: build.mutation<Installation, InstallAppData>({
            query: (data) => {
                return {
                    url: `/marketplace-management/marketplace/installations`,
                    method: 'POST',
                    body: {
                        app: data.app,
                        organization: data.organization,
                        config_data: data.config_data,
                    },
                }
            },
            invalidatesTags: ['App', 'Installation'],
        }),
        getInstallation: build.query<Installation, { id: string }>({
            query: (data) => ({
                url: `/marketplace-management/marketplace/installations/${data.id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'Installation', id: arg.id }],
        }),
        uninstallApp: build.mutation<{}, UninstallAppData>({
            query: (data) => ({
                url: `/marketplace-management/marketplace/installations/${data.installation_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['App', 'Installation'],
        }),
        getAllCategories: build.query<{ categories: Category[] }, GetAllCategoriesData>({
            query: () => ({
                url: '/marketplace-management/marketplace/categories',
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        getAppReviews: build.query<ReturnedData<Review[]>, GetAppData & { limit?: number; offset?: number }>({
            query: (params) => {
                const queryParams: Record<string, any> = {}
                if (params.limit !== undefined) queryParams.limit = params.limit
                if (params.offset !== undefined) queryParams.offset = params.offset

                return {
                    url: `/marketplace-management/marketplace/apps/${params.app_id}/reviews`,
                    method: 'GET',
                    params: queryParams,
                }
            },
            providesTags: (result) => providesList(result?.results, 'Review'),
        }),
        createReview: build.mutation<{ rating: number; message?: string }, CreateReviewData>({
            query: (data) => ({
                url: `/marketplace-management/marketplace/apps/${data.app_id}/reviews`,
                method: 'POST',
                body: {
                    rating: data.rating,
                    message: data.message,
                },
            }),
            invalidatesTags: ['Review', 'App'],
        }),
        getOrganizationInstallations: build.query<ReturnedData<Installation[]>, { organization_id: string }>({
            query: (params) => ({
                url: `/marketplace-management/marketplace/admin/installations`,
                method: 'GET',
                params: {
                    schoolId: params.organization_id,
                },
            }),
            providesTags: (result) => providesList(result?.results, 'Installation'),
        }),
        checkAppInstallation: build.query<Installation | null, { app_id: string; organization_id: string }>({
            query: (params) => ({
                url: `/marketplace-management/marketplace/admin/installations`,
                method: 'GET',
                params: {
                    schoolId: params.organization_id,
                    appId: params.app_id,
                },
            }),
            transformResponse: (response: ReturnedData<Installation[]>) => {
                return response?.results?.[0] || null
            },
            providesTags: (result, error, arg) => [{ type: 'Installation', id: result?.id || 'none' }],
        }),
        generateAuthCode: build.mutation<GenerateAuthCodeResponse, GenerateAuthCodeData>({
            query: (data) => ({
                url: `/marketplace-management/marketplace/auth/generate_code`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const {
    useGetAllAppsQuery,
    useGetAppQuery,
    useLazyGetAppQuery,
    useInstallAppMutation,
    useGetInstallationQuery,
    useUninstallAppMutation,
    useGetAllCategoriesQuery,
    useGetAppReviewsQuery,
    useCreateReviewMutation,
    useGetOrganizationInstallationsQuery,
    useCheckAppInstallationQuery,
    useGenerateAuthCodeMutation,
} = marketplaceApi


