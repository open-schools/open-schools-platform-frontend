import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, Typography } from 'antd'
import Image from 'next/image'

import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'

import styles from './styles/styles.module.scss'
import { ErrorType } from '@store/commonApi'
import router from 'next/router'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { Button } from '@domains/common/components/button'
import { Field } from '@domains/common/components/field'
import { ActionBar } from '@domains/common/components/stickyBlock/actionBar'
import DeleteModal from '@domains/common/components/deleteModal'
import { useDeleteTeacherByIdMutation, useGetTeacherQuery } from '@domains/Teacher/redux/TeacherApi'
import { AppRoutes, DynamicAppRoutes, DynamicRoutePath, RoutePath } from '@domains/common/constants/routerEnums'

const CurrentTeacher = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [mutation, isDeleteFinished] = useDeleteTeacherByIdMutation()
    const uuid = getUuidFromUrl()

    const {
        data: Teacher,
        error: TeacherError,
        isLoading,
    } = useGetTeacherQuery({
        Teacher_id: uuid[0],
    })

    useEffect(() => {
        if (TeacherError && (TeacherError as ErrorType).status == 404) {
            router.push(RoutePath[AppRoutes.Teacher_LIST])
        }
    }, [TeacherError])

    if (isDeleteFinished.isSuccess) return null
    if (uuid.length === 0) router.push(RoutePath[AppRoutes.NOT_FOUND])

    return isLoading ? (
        <Spin />
    ) : (
        <>
            <Col className={styles.headersBlock}>
                <Row className={styles.baseRowContainer}>
                    <Col lg={4} className={styles.image}>
                        <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
                    </Col>
                    <Col className={styles.infoContainer} lg={24}>
                        <Typography.Title className={styles.title} level={1}>
                            {Teacher?.Teacher.name ? Teacher?.Teacher.name : 'Имя не определено'}
                        </Typography.Title>
                        <Field
                            fieldName={'Телефон сотрудника:'}
                            fieldValue={Teacher?.Teacher?.phone}
                            defaultValue={'Не определено'}
                        />
                        <Field
                            fieldName={'E-mail сотрудника:'}
                            fieldValue={Teacher?.Teacher.email}
                            defaultValue={'Не определено'}
                        />
                        <Field
                            fieldName={'Должность:'}
                            fieldValue={Teacher?.Teacher.position}
                            defaultValue={'Не определено'}
                        />
                        <div className={styles.stickyBlock}>
                            <ActionBar
                                actions={[
                                    <Button
                                        key={'edit'}
                                        className={styles.changeButton}
                                        onClick={() =>
                                            router.push(DynamicRoutePath[DynamicAppRoutes.Teacher_CHANGE](uuid[0]))
                                        }
                                    >
                                        Редактировать профиль
                                    </Button>,
                                    <Button
                                        antdType={'ghost'}
                                        className={styles.deleteButton}
                                        key='submit'
                                        danger
                                        onClick={() => setIsModalVisible(true)}
                                    >
                                        Удалить
                                    </Button>,
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <DeleteModal
                isModalVisible={isModalVisible}
                mutation={mutation}
                setIsModalVisible={setIsModalVisible}
                titleText={'Удалить преподавателя?'}
                buttonText={'Удалить преподавателя'}
                urlAfterDelete={RoutePath[AppRoutes.Teacher_LIST]}
                dataField={'Teacher_id'}
            />
        </>
    )
}

export default CurrentTeacher
