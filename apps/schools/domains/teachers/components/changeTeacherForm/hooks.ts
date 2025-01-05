import { useMemo } from 'react'
import { ValidatorsMap } from '@domains/common/redux/interfaces'
import { PleaseInputStudentNameMsg } from '@domains/user/components/auth/constants/message'
import { getGreaterValidator } from '@domains/common/utils/validators'
import { STUDENT_NAME } from '@domains/student/components/changeStudentForm/constants'

export const useChangeEmployeeFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            [STUDENT_NAME]: [
                {
                    required: false,
                    message: PleaseInputStudentNameMsg,
                    whitespace: true,
                    type: 'string',
                },
                getGreaterValidator(200),
            ],
        }
    }, [this])
}
