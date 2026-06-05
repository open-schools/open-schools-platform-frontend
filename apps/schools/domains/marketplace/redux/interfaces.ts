import { BasePaginationData } from '@domains/common/redux/interfaces'

export type AppType = 'internal' | 'external'
export type AppStatus = 'draft' | 'moderation' | 'published' | 'rejected'
export type InstallationStatus = 'active' | 'inactive' | 'pending'

export interface DeveloperProfile {
    id: string
    user: string
    email?: string
    github?: string
    description?: string
}

export interface Category {
    id: string
    name: string
}

export interface AppRelease {
    id: string
    app: string
    version: string
    date: string
    icon?: string
    name?: string
    description?: string
    manifest?: Record<string, any>
}

export interface Review {
    id: string
    user: string
    app: string
    rating: number
    message?: string
    created_at: string
}

export interface App {
    id: string
    name: string
    description: string
    type: AppType
    status: AppStatus
    icon_url?: string
    screenshots?: string[]
    DeveloperProfile: DeveloperProfile
    Category: Category[]
    visibility_scope?: string
    created_at: string
    updated_at: string
    latest_release?: AppRelease
    latest_published_release?: AppRelease
    rating?: number
    reviews_count?: number
    required_scopes: string[]
    optional_scopes: string[]
}

export interface Installation {
    id: string
    app: string | { id: string; name: string }
    organization: string
    user: string
    active: boolean
    config_data?: Record<string, any>
    created_at: string
    updated_at: string
    installed_at?: string
    deleted?: string
    deleted_by_cascade?: boolean
    school?: { id: string; name: string }
    status?: boolean
    granted_scopes: string
}

export interface GetAllAppsData extends BasePaginationData {
    category_id?: number
    developer_profile_id?: string
    sort?: string
    type?: AppType
    q?: string
    page?: number
    page_size?: number
}

export interface GetAppData {
    app_id: string
}

export interface InstallAppData {
    id?: string
    app: string
    organization: string
    user?: string
    config_data?: Record<string, any>
    scopes?: string[]
}

export interface UninstallAppData {
    installation_id: string
}

export interface GetAllCategoriesData {}

export interface CreateReviewData {
    app_id: string
    rating: number
    message?: string
}