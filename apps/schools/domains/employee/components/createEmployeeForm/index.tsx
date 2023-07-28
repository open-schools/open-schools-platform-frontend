import { Form, Typography } from 'antd'
import React from 'react'
import { Input } from '../../../common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '../../../common/components/button'
import { useCreateEmployeeFormValidators } from './hooks'
import { useInviteEmployeeMutation } from '../../../organization/redux/organizationApi'
import { useOrganization } from '../../../user/providers/organizationProvider'
import { handleSubmitForm } from '../../handlers/employee'

export const CreateEmployeeForm = () => {
    const validators = useCreateEmployeeFormValidators()
    const { organizationId } = useOrganization()
    const [ form ] = Form.useForm()
    const [ mutation ] = useInviteEmployeeMutation()

    return (
        <Form
            form={form}
            colon={false}
            requiredMark={false}
            onFinish={() => handleSubmitForm(organizationId, form, mutation)}
            layout="vertical"
            style={{ maxWidth: '600px' }}
        >
            <Typography.Title level={1}>Добавление Сотрудника</Typography.Title>
            <Form.Item
                label="Телефон сотрудника"
                name="phone"
                className={styles.label}
                rules={validators.phone}
            >
                <Input customType='inputPhone' placeholder="Введите телефон сотрудника"/>
            </Form.Item>
            <Form.Item
                label="Ф. И. О. сотрудника"
                name="name"
                className={styles.label}
                rules={validators.name}
            >
                <Input placeholder="Введите Ф. И. О. сотрудника"/>
            </Form.Item>
            <Form.Item
                label="Email сотрудника"
                name="email"
                className={styles.label}
                rules={validators.email}
            >
                <Input type='email' placeholder="Введите email сотрудника"/>
            </Form.Item>
            <Form.Item
                label="Должность сотрудника"
                name="position"
                className={styles.label}
            >
                <Input placeholder="Введите должность сотрудника"/>
            </Form.Item>
            <Form.Item
                name="button"
            >
                <Button
                    key="submit"
                    type="schoolDefault"
                    htmlType="submit"
                    block
                    data-cy="resetcomplete-button"
                    style={{ width: '30%' }}
                    className={styles.button}
                >
                    Добавить сотрудника
                </Button>
            </Form.Item>
        </Form>
    )
}
