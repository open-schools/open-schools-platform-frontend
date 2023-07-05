export interface UserProfiles {
    id: string,
    phone: string,
    name: string,
    // TODO: make parent_profile, employee_profile, student_profile, teacher_profile interfaces
    'parent_profile': any,
    'employee_profile': any,
    'student_profile': any,
    'teacher_profile': any,
}
