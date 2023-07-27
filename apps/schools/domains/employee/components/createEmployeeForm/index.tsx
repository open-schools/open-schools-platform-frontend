import { Form, Typography } from 'antd'
import React from 'react'
import { Input } from '../../../common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '../../../common/components/button'
import { useCreateEmployeeFormValidators } from './hooks'
import { useGetAllOrganizationsQuery, useInviteEmployeeMutation } from '../../../organization/redux/organizationApi'

export const CreateEmployeeForm = () => {
    const validators = useCreateEmployeeFormValidators()
    const [form] = Form.useForm()
    const { data } = useGetAllOrganizationsQuery({})
    const [ mutation ] = useInviteEmployeeMutation()

    const handleSubmitForm = async () => {
        let response = await mutation({
            organization_id: String(data?.results[5].id),
            email: form.getFieldValue('email'),
            phone: form.getFieldValue('phone'),
            body: { name: form.getFieldValue('name'), position: form.getFieldValue('position') },
        })
        if ('data' in response) {
            console.log(response)
        } else {
            form.setFields([
                {
                    name: 'phone',
                    errors: ['Неверный формат телефона'],
                },
            ])
        }
    }

    return (
        <Form
            form={form}
            colon={false}
            requiredMark={false}
            onFinish={handleSubmitForm}
            layout="vertical"
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
                >
                    Добавить сотрудника
                </Button>
            </Form.Item>
        </Form>
    )
}
