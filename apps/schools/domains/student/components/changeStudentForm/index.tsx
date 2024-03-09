import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { Col, Form, Row, Spin, Typography } from 'antd'
import { Button } from '@domains/common/components/button'
import styles from './styles/styles.module.scss'
import Image from 'next/image'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'

import { isValidFormCheck } from '@domains/common/utils/form'
import { Input } from '@domains/common/components/input'

import { useGetStudentQuery } from '@domains/organization/redux/organizationApi'
import { STUDENT_NAME } from '../createStudentForm/constants'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import { handleSubmitForm } from '@domains/student/handlers/studentPatch'
import { useUpdateStudentByIdMutation } from '@domains/student/redux/studentApi'
import { useChangeStudentFormValidators } from '@domains/student/components/changeStudentForm/hooks'
import { ErrorType } from '@store/commonApi'

export function ChangeStudentForm() {
    const uuid = getUuidFromUrl()
    const { data: student, error: studentError, isFetching } = useGetStudentQuery({ student_id: uuid[0] })
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const validators = useChangeStudentFormValidators()
    const [mutation] = useUpdateStudentByIdMutation()

    const initialValues = {
        [STUDENT_NAME]: student?.student.name ?? '',
    }

    useEffect(() => {
        if (studentError && (studentError as ErrorType).status == 404) {
            router.push('/student')
        }
    }, [studentError])

    if (uuid.length === 0) router.push('/404')

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [], initialValues))
    }

    return (
        <Row className={styles.baseRowContainer}>
            <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
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
                                if (isSuccess) router.push(`/student/${uuid[0]}`)
                            })
                        }}
                        layout='vertical'
                    >
                        <Form.Item
                            required={true}
                            label={'Ф. И. О.'}
                            name={STUDENT_NAME}
                            rules={validators[STUDENT_NAME]}
                            className={styles.label}
                            initialValue={initialValues[STUDENT_NAME]}
                        >
                            <Input required={true} placeholder='Введите имя' />
                        </Form.Item>

                        <Row className={styles.buttonsContainer}>
                            <Button type='schoolDefaultAuto' htmlType='submit' disabled={!isFormValid} block>
                                Сохранить изменения
                            </Button>

                            <Button
                                type='schoolDefaultAuto'
                                antdType={'default'}
                                block
                                onClick={() => router.push(`/student/${uuid[0]}`)}
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
