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
import { useGetTeacherQuery, useUpdateTeacherByIdMutation } from '@domains/teachers/redux/TeacherApi'
import { useChangeTeacherFormValidators } from '@domains/teachers/components/changeTeacherForm/hooks'
import { TEACHER_NAME, TEACHER_POSITION } from '@domains/teachers/components/changeTeacherForm/constants'
import { handleSubmitForm } from '@domains/teachers/handlers/TeacherPatch'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export function ChangeTeacherForm() {
    const uuid = getUuidFromUrl()
    const { data: Teacher, error: TeacherError, isFetching } = useGetTeacherQuery({ Teacher_id: uuid[0] })
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const validators = useChangeTeacherFormValidators()
    const [mutation] = useUpdateTeacherByIdMutation()

    const initialValues = {
        [TEACHER_NAME]: Teacher?.Teacher.name ?? '',
        [TEACHER_POSITION]: Teacher?.Teacher.position ?? '',
    }

    useEffect(() => {
        if (TeacherError && (TeacherError as ErrorType).status == 404) {
            router.push(RoutePath[AppRoutes.Teacher_LIST])
        }
    }, [TeacherError])

    if (uuid.length === 0) router.push(RoutePath[AppRoutes.NOT_FOUND])

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [], initialValues))
    }

    return (
        <Row className={styles.baseRowContainer}>
            <Image className={styles.image} src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
            <Col className={styles.infoContainer}>
                <Typography.Title className={styles.title} level={1}>
                    Редактирование преподавателя
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
                                if (isSuccess) router.push(`${RoutePath[AppRoutes.Teacher_LIST]}/${uuid[0]}`)
                            })
                        }}
                        layout='vertical'
                    >
                        <Form.Item
                            required={true}
                            label={'Ф. И. О.'}
                            name={TEACHER_NAME}
                            rules={validators[TEACHER_NAME]}
                            className={styles.label}
                            initialValue={initialValues[TEACHER_NAME]}
                        >
                            <Input required={true} placeholder='Введите имя' />
                        </Form.Item>

                        <Form.Item
                            required={true}
                            label={'Должность'}
                            name={TEACHER_POSITION}
                            rules={validators[TEACHER_POSITION]}
                            className={styles.label}
                            initialValue={initialValues[TEACHER_POSITION]}
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
                                onClick={() => router.push(`${RoutePath[AppRoutes.Teacher_LIST]}/${uuid[0]}`)}
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
