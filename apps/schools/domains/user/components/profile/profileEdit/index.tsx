import React, { useState } from 'react'
import router from 'next/router'
import { Col, Form, Row, Spin, Typography } from 'antd'
import { Button } from '@domains/common/components/button'
import styles from './styles/styles.module.scss'
import Image from 'next/image'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { useUserProfile } from '@domains/user/providers/authProvider'
import { USER_NAME, USER_EMAIL } from '@domains/user/components/profile/profileEdit/constants'
import { isValidFormCheck } from '@domains/common/utils/form'
import { Input } from '@domains/common/components/input'
import Link from 'next/link'
import { useChangeUserProfileFormValidators } from '@domains/user/components/profile/profileEdit/hooks'
import { useUpdateEmployeeProfileByIdMutation } from '@domains/employee/redux/employeeApi'
import { handleSubmitForm } from '@domains/user/handlers/profile/profileEdit'

export function ProfileEdit() {
    const { user } = useUserProfile()

    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const validators = useChangeUserProfileFormValidators()
    const [mutation] = useUpdateEmployeeProfileByIdMutation()

    const initialValues = {
        [USER_NAME]: user.employee_profile?.name ?? '',
        [USER_EMAIL]: user.employee_profile?.email ?? '',
    }

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [], initialValues))
    }

    return (
        <Row className={styles.baseRowContainer}>
            <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
            <Col className={styles.infoContainer}>
                <Typography.Title className={styles.title} level={1}>
                    Редактирование профиля
                </Typography.Title>

                {user.phone ? (
                    <Form
                        form={form}
                        className={styles.table}
                        colon={false}
                        requiredMark={false}
                        onValuesChange={validationCheck}
                        onFinish={() => {
                            handleSubmitForm(user.employee_profile?.id ?? '', form, mutation).then((isSuccess) => {
                                if (isSuccess) window.location.href = '/user'
                            })
                        }}
                        layout='vertical'
                    >
                        <Form.Item
                            required={true}
                            label={'Ф. И. О.'}
                            name={USER_NAME}
                            rules={validators[USER_NAME]}
                            className={styles.label}
                            initialValue={initialValues[USER_NAME]}
                        >
                            <Input required={true} placeholder='Введите имя' />
                        </Form.Item>

                        <Form.Item
                            required={true}
                            label={'Email сотрудника'}
                            name={USER_EMAIL}
                            rules={validators[USER_EMAIL]}
                            className={styles.label}
                            initialValue={initialValues[USER_EMAIL]}
                        >
                            <Input placeholder='Введите email' />
                        </Form.Item>

                        <Form.Item required={false} label={'Пароль'} className={styles.label}>
                            <Link href={'/auth/forgot'}>Сбросить пароль</Link>
                        </Form.Item>

                        <Row className={styles.buttonsContainer}>
                            <Button
                                type='schoolDefault'
                                htmlType='submit'
                                disabled={!isFormValid}
                                block
                                style={{ width: '40%' }}
                            >
                                Сохранить изменения
                            </Button>

                            <Button
                                type='schoolDefault'
                                antdType={'default'}
                                block
                                style={{ width: '20%' }}
                                onClick={() => router.push('/user')}
                            >
                                Отменить
                            </Button>
                        </Row>
                    </Form>
                ) : (
                    <Spin />
                )}
            </Col>
        </Row>
    )
}
