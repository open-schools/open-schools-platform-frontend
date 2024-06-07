import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { Col, Form, Row, Spin, Typography } from 'antd'
import { Button } from '@domains/common/components/button'
import styles from './styles/styles.module.scss'
import Image from 'next/image'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'

import { isValidFormCheck } from '@domains/common/utils/form'
import { Input } from '@domains/common/components/input'

import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'

import { ErrorType } from '@store/commonApi'
import { useGetEmployeeQuery, useUpdateEmployeeByIdMutation } from '@domains/employee/redux/employeeApi'
import { useChangeEmployeeFormValidators } from '@domains/employee/components/changeEmployeeForm/hooks'
import { EMPLOYEE_NAME, EMPLOYEE_POSITION } from '@domains/employee/components/changeEmployeeForm/constants'
import { handleSubmitForm } from '@domains/employee/handlers/employeePatch'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export function ChangeEmployeeForm() {
    const uuid = getUuidFromUrl()
    const { data: employee, error: employeeError, isFetching } = useGetEmployeeQuery({ employee_id: uuid[0] })
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const validators = useChangeEmployeeFormValidators()
    const [mutation] = useUpdateEmployeeByIdMutation()

    const initialValues = {
        [EMPLOYEE_NAME]: employee?.employee.name ?? '',
        [EMPLOYEE_POSITION]: employee?.employee.position ?? '',
    }

    useEffect(() => {
        if (employeeError && (employeeError as ErrorType).status == 404) {
            router.push(RoutePath[AppRoutes.EMPLOYEE_LIST])
        }
    }, [employeeError])

    if (uuid.length === 0) router.push(RoutePath[AppRoutes.NOT_FOUND])

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [], initialValues))
    }

    return (
        <Row className={styles.baseRowContainer}>
            <Image className={styles.image} src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
            <Col className={styles.infoContainer}>
                <Typography.Title className={styles.title} level={1}>
                    Редактирование обучающегося
                </Typography.Title>

                {!isFetching ? (
                    <Form
                        form={form}
                        className={styles.table}
                        colon={false}
                        requiredMark={false}
                        onValuesChange={validationCheck}
                        onFinish={() => {
                            handleSubmitForm(uuid[0], form, mutation).then((isSuccess) => {
                                if (isSuccess) router.push(`${RoutePath[AppRoutes.EMPLOYEE_LIST]}/${uuid[0]}`)
                            })
                        }}
                        layout='vertical'
                    >
                        <Form.Item
                            required={true}
                            label={'Ф. И. О.'}
                            name={EMPLOYEE_NAME}
                            rules={validators[EMPLOYEE_NAME]}
                            className={styles.label}
                            initialValue={initialValues[EMPLOYEE_NAME]}
                        >
                            <Input required={true} placeholder='Введите имя' />
                        </Form.Item>

                        <Form.Item
                            required={true}
                            label={'Должность'}
                            name={EMPLOYEE_POSITION}
                            rules={validators[EMPLOYEE_POSITION]}
                            className={styles.label}
                            initialValue={initialValues[EMPLOYEE_POSITION]}
                        >
                            <Input required={true} placeholder='Введите должность' />
                        </Form.Item>

                        <Row className={styles.buttonsContainer}>
                            <Button type='schoolDefaultAuto' htmlType='submit' disabled={!isFormValid} block>
                                Сохранить изменения
                            </Button>

                            <Button
                                type='schoolDefaultAuto'
                                antdType={'default'}
                                block
                                onClick={() => router.push(`${RoutePath[AppRoutes.EMPLOYEE_LIST]}/${uuid[0]}`)}
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
