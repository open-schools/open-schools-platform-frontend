import { Form, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '@domains/common/components/button'
import { useCreateStudentFormValidators } from './hooks'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { useInviteStudentMutation } from '@domains/circle/redux/circleApi'
import { useGetAllCirclesQuery } from '@domains/organization/redux/organizationApi'
import { isValidFormCheck } from '@domains/common/utils/form'
import {
    CIRCLES,
    PARENT_EMAIL,
    PARENT_PHONE,
    STUDENT_NAME,
    STUDENT_PHONE,
} from '@domains/student/components/createStudentForm/constants'
import { handleSubmitForm } from '@domains/student/handlers/studentCreate'
import { WithTooltip } from '@domains/common/components/tooltip/withTooltip'
import { TOOLTIP_MARGIN_TOP } from '@domains/student/components/createStudentForm/styles/constants'
import { Select } from '@domains/common/components/select'
import router from 'next/router'
import { DROPDOWN_STYLE } from '@domains/common/components/containers/BaseLayoutComponents/OrganizationSelect/styles/styles'

export const CreateStudentForm = () => {
    const validators = useCreateStudentFormValidators()
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const { organization } = useOrganization()
    const [mutation] = useInviteStudentMutation()
    const circlesData = useGetAllCirclesQuery({
        organization_id: organization.id,
    })

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [STUDENT_NAME, PARENT_PHONE, CIRCLES]))
    }

    useEffect(() => {
        form.setFieldValue(STUDENT_NAME, localStorage.getItem(STUDENT_NAME))
        form.setFieldValue(PARENT_PHONE, localStorage.getItem(PARENT_PHONE))
        form.setFieldValue(STUDENT_PHONE, localStorage.getItem(STUDENT_PHONE))
        form.setFieldValue(PARENT_EMAIL, localStorage.getItem(PARENT_EMAIL))
    }, [form])

    return (
        <Form
            form={form}
            className={styles.table}
            colon={false}
            requiredMark={false}
            onFinish={() => {
                handleSubmitForm(form, mutation).then((isSuccess) => {
                    if (isSuccess) {
                        localStorage.removeItem(STUDENT_NAME)
                        localStorage.removeItem(PARENT_PHONE)
                        localStorage.removeItem(PARENT_EMAIL)
                        localStorage.removeItem(STUDENT_PHONE)
                        router.push('/student')
                    }
                })
            }}
            layout='vertical'
            onValuesChange={validationCheck}
        >
            <Typography.Title level={1}>Добавление обучающегося</Typography.Title>
            <WithTooltip
                tooltipText={'Ф. И. О. ученика необходимо для ведения отчетности и добавления его в списки.'}
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item
                    label={
                        <span>
                            <span className={styles.requiredMark}>*</span> Ф. И. О. обучающегося
                        </span>
                    }
                    name={STUDENT_NAME}
                    className={styles.label}
                    rules={validators.name}
                >
                    <Input
                        onChange={() => localStorage.setItem(STUDENT_NAME, form.getFieldValue(STUDENT_NAME))}
                        placeholder='Введите Ф. И. О. обучающегося'
                    />
                </Form.Item>
            </WithTooltip>
            <WithTooltip
                tooltipText={
                    'Телефон родителя или законного' +
                    'представителя необходим для связи и донесения важной информации. '
                }
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item
                    label={
                        <span>
                            <span className={styles.requiredMark}>*</span> Телефон родителя
                        </span>
                    }
                    name={PARENT_PHONE}
                    className={styles.label}
                    rules={validators.parentPhone}
                >
                    <Input
                        onChange={() => localStorage.setItem(PARENT_PHONE, form.getFieldValue(PARENT_PHONE))}
                        valueName={PARENT_PHONE}
                        customType='inputPhone'
                        placeholder='Введите телефон родителя'
                    />
                </Form.Item>
            </WithTooltip>

            <WithTooltip
                tooltipText={
                    'E-mail родителя или законного представителя' +
                    ' необходим для связи и донесения важной информации.'
                }
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item label='Email родителя' name={PARENT_EMAIL} className={styles.label} rules={validators.email}>
                    <Input
                        onChange={() => localStorage.setItem(PARENT_EMAIL, form.getFieldValue(PARENT_EMAIL))}
                        type='email'
                        placeholder='Введите email родителя'
                    />
                </Form.Item>
            </WithTooltip>
            <WithTooltip
                tooltipText={'Для связи с учеником при возникновении нештатной ситуации.'}
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item
                    label='Телефон обучающегося'
                    name={STUDENT_PHONE}
                    className={styles.label}
                    rules={validators.studentPhone}
                >
                    <Input
                        onChange={() => localStorage.setItem(STUDENT_PHONE, form.getFieldValue(STUDENT_PHONE))}
                        valueName={STUDENT_PHONE}
                        customType='inputPhone'
                        placeholder='Введите телефон обучающегося'
                    />
                </Form.Item>
            </WithTooltip>
            <WithTooltip tooltipText={'Укажите кружок, на который будет ходить ученик.'} margin={TOOLTIP_MARGIN_TOP}>
                <Form.Item
                    label={
                        <span>
                            <span className={styles.requiredMark}>*</span> Название кружка
                        </span>
                    }
                    name={CIRCLES}
                    className={styles.label}
                    rules={validators.select}
                >
                    <Select
                        mode='multiple'
                        customType={'selectMultiple'}
                        placeholder='Выберите кружок'
                        className={styles.select}
                        loading={circlesData.isLoading}
                        dropdownStyle={DROPDOWN_STYLE}
                        dropdownRender={(menu) => (
                            <div className={styles.dropdown}>
                                {menu}
                                <Button
                                    type='schoolDefault'
                                    block
                                    className={styles.button}
                                    onClick={() => router.push('/circle/create')}
                                >
                                    Добавить кружок
                                </Button>
                            </div>
                        )}
                        options={circlesData?.data?.results.map((x) => {
                            return {
                                value: x.id,
                                label: x.name,
                            }
                        })}
                    />
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
                    style={{ width: '40%' }}
                    className={styles.button}
                >
                    Добавить обучающегося
                </Button>
            </Form.Item>
        </Form>
    )
}
