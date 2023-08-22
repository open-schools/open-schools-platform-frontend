import { Form, Typography } from 'antd'
import React, { useState } from 'react'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '@domains/common/components/button'
import { useCreateEmployeeFormValidators } from './hooks'
import { useInviteEmployeeMutation } from '@domains/organization/redux/organizationApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { handleSubmitForm } from '@domains/employee/handlers/employee'
import { useRouter } from 'next/router'
import { WithTooltip } from '@domains/common/components/tooltip/withTooltip'
import { TOOLTIP_MARGIN } from '@domains/employee/components/createEmployeeForm/styles/styles'
import { isValidFormCheck } from '@domains/common/utils/form'
import {
    EMPLOYEE_EMAIL,
    EMPLOYEE_NAME,
    EMPLOYEE_PHONE,
    EMPLOYEE_POSITION,
} from '@domains/employee/components/createEmployeeForm/constants'

export const CreateEmployeeForm = () => {
    const validators = useCreateEmployeeFormValidators()
    const { organizationId } = useOrganization()
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const [mutation] = useInviteEmployeeMutation()
    const router = useRouter()

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [EMPLOYEE_NAME, EMPLOYEE_PHONE]))
    }

    return (
        <Form
            form={form}
            className={styles.table}
            colon={false}
            requiredMark={false}
            onValuesChange={validationCheck}
            onFinish={() => {
                handleSubmitForm(organizationId, form, mutation).then((isSucceed) => {
                    if (isSucceed) router.push('/employee')
                })
            }}
            layout='vertical'
        >
            <Typography.Title level={1}>Добавление Сотрудника</Typography.Title>
            <WithTooltip tooltipText={'Здесь будет текст тултипа'} margin={TOOLTIP_MARGIN}>
                <Form.Item
                    required={true}
                    label={
                        <span>
                            <span className={styles.requiredMark}>*</span> Телефон сотрудника
                        </span>
                    }
                    name={EMPLOYEE_PHONE}
                    className={styles.label}
                    rules={validators.phone}
                >
                    <Input required={true} customType='inputPhone' placeholder='Введите телефон сотрудника' />
                </Form.Item>
            </WithTooltip>

            <WithTooltip tooltipText={'Здесь будет текст тултипа'} margin={TOOLTIP_MARGIN}>
                <Form.Item
                    required
                    label={
                        <span>
                            <span className={styles.requiredMark}>*</span> Ф. И. О. сотрудника
                        </span>
                    }
                    name={EMPLOYEE_NAME}
                    className={styles.label}
                    rules={validators.name}
                >
                    <Input placeholder='Введите Ф. И. О. сотрудника' />
                </Form.Item>
            </WithTooltip>

            <WithTooltip tooltipText={'Здесь будет текст тултипа'} margin={TOOLTIP_MARGIN}>
                <Form.Item
                    label='Email сотрудника'
                    name={EMPLOYEE_EMAIL}
                    className={styles.label}
                    rules={validators.email}
                >
                    <Input type='email' placeholder='Введите email сотрудника' />
                </Form.Item>
            </WithTooltip>

            <WithTooltip tooltipText={'Здесь будет текст тултипа'} margin={TOOLTIP_MARGIN}>
                <Form.Item label='Должность сотрудника' name={EMPLOYEE_POSITION} className={styles.label}>
                    <Input placeholder='Введите должность сотрудника' />
                </Form.Item>
            </WithTooltip>

            <Form.Item name='button'>
                <Button
                    disabled={!isFormValid}
                    key='submit'
                    type='schoolDefault'
                    htmlType='submit'
                    block
                    data-cy='resetcomplete-button'
                    style={{ width: '30%' }}
                    className={styles.button}
                >
                    Добавить сотрудника
                </Button>
            </Form.Item>
        </Form>
    )
}
