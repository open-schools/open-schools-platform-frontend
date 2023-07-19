import { Photo } from '../../common/redux/entities'
import { StudentProfile } from '../../user/redux/entities'

export interface Organization {
    id?: string,
    name?: string,
    inn?: string,
}

export interface StudentPhoto {
    id?: string,
    photo: Photo,
}

export interface StudentProfileAdditional {
    'parent_phone'?: string,
    'parent_name'?: string,
    'student_phone'?: string,
    text?: string,
}

export interface CircleOrganization {
    id?: string,
    name: string,
}

export interface Student {
    id?: string,
    name: string,
    circle?: string,
    'student_profile': StudentProfile
}

export interface Teacher {
    id?: string,
    name: string,
    circle?: string,
    'teacher_profile'?: string,
}

export interface Analytics {
    'IN_PROGRESS': number,
    'SENT': number,
    'ACCEPTED': number,
    'DECLINED': number,
    'CANCELED': number,
}

export interface QueryStatus {
    id: string,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
}
