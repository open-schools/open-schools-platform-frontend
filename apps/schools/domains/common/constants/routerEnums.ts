export const enum AppRoutes {
    AUTH = 'auth',
    AUTH_SIGN_IN = 'authSignin',
    AUTH_REGISTER = 'authRegister',
    AUTH_FORGOT = 'authForgot',
    CIRCLE_LIST = 'circle',
    CIRCLE_CREATE = 'circleCreate',
    EMPLOYEE_LIST = 'employeeList',
    EMPLOYEE_CREATE = 'employeeCreate',
    MAIN = 'main',
    MOBILE_RECAPTCHA = 'mobileRecaptcha',
    TICKETS_LIST = 'ticketsList',
    NOT_FOUND = 'notFound',
    QUERY_LIST = 'queryList',
    STUDENT_LIST = 'studentList',
    STUDENT_CREATE = 'studentCreate',
    USER_LIST = 'userList',
    USER_EDIT = 'userEdit',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.AUTH_SIGN_IN]: '/auth/signin',
    [AppRoutes.AUTH_REGISTER]: '/auth/register',
    [AppRoutes.AUTH_FORGOT]: '/auth/forgot',
    [AppRoutes.CIRCLE_LIST]: '/circle',
    [AppRoutes.CIRCLE_CREATE]: '/circle/create',
    [AppRoutes.EMPLOYEE_LIST]: '/employee',
    [AppRoutes.EMPLOYEE_CREATE]: '/employee/create',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.MOBILE_RECAPTCHA]: '/mobile-recaptcha',
    [AppRoutes.TICKETS_LIST]: '/ticket',
    [AppRoutes.NOT_FOUND]: '/404',
    [AppRoutes.QUERY_LIST]: '/query',
    [AppRoutes.STUDENT_LIST]: '/student',
    [AppRoutes.STUDENT_CREATE]: '/student/create',
    [AppRoutes.USER_LIST]: '/user',
    [AppRoutes.USER_EDIT]: '/user/edit',
}

export const enum DynamicAppRoutes {
    CIRCLE_CHANGE = 'circleChange',
    EMPLOYEE_CHANGE = 'employeeChange',
    STUDENT_CHANGE = 'studentChange',
}

export const DynamicRoutePath: Record<DynamicAppRoutes, (...args: string[]) => string> = {
    [DynamicAppRoutes.CIRCLE_CHANGE]: (id: string) => `/circle/${id}/change`,
    [DynamicAppRoutes.EMPLOYEE_CHANGE]: (id: string) => `/employee/${id}/change`,
    [DynamicAppRoutes.STUDENT_CHANGE]: (id: string) => `/student/${id}/change`,
}
