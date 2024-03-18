import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, Tooltip, Typography } from 'antd'
import Image from 'next/image'

import { useGetStudentQuery, useLazyGetAllStudentInvitationsQuery } from '@domains/organization/redux/organizationApi'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'

import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'
import styles from './styles/styles.module.scss'
import { ErrorType } from '@store/commonApi'
import router from 'next/router'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { Button } from '@domains/common/components/button'
import { Field } from '@domains/common/components/field'
import { useDeleteStudentMutation } from '@domains/student/redux/studentApi'
import { ActionBar } from '@domains/common/components/stickyBlock/actionBar'
import DeleteModal from '@domains/common/components/deleteModal'
import { GetStudent } from '@domains/common/redux/serializers'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import parentAcceptedPhone from '@public/icons/parentAcceptedMobile.svg'
import parentDeclinedPhone from '@public/icons/parentDeclinedMobile.svg'

const CurrentStudent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { organizationId } = useOrganization()
    const uuid = getUuidFromUrl()

    const [mutation, isDeleteFinished] = useDeleteStudentMutation()

    const [student, setStudent] = useState<GetStudent | undefined>(undefined)
    const { data: studentInfo, error: studentError, isLoading } = useGetStudentQuery({ student_id: uuid[0] })
    const [trigger, studentInfoAdditional] = useLazyGetAllStudentInvitationsQuery()
    const isVerifiedStudent = studentInfo?.student.circle && studentInfo?.student.circle

    useEffect(() => {
        if (studentError && ((studentError as ErrorType).status == 404 || (studentError as ErrorType).status == 403)) {
            router.push('/student')
        }
    }, [studentError])

    useEffect(() => {
        if (isVerifiedStudent) {
            setStudent(studentInfo.student)
        } else {
            trigger({ student__id: uuid[0], circle__organization__id: organizationId })
        }
    }, [studentInfo])

    useEffect(() => {
        const info = studentInfoAdditional.data?.results[0]
        if (info)
            setStudent({
                id: uuid[0],
                name: info.body.name,
                student_profile: {
                    parent_phones: info.recipient?.parent_phones,
                    name: '',
                    phone: info.additional.phone,
                    photo: {},
                },
                circle: {
                    name: info.sender.name,
                },
            })
    }, [studentInfoAdditional])

    if (isDeleteFinished.isSuccess) return null
    if (uuid.length === 0) router.push('/404')

    return (
        <EmptyWrapper
            titleText={'Упс, произошла ошибка!'}
            descriptionText={'Попробуйте перезагрузить страницу. ' + 'Мы уже работаем над исправлением ошибки.'}
            pageTitle={'Обучающийся'}
            data={student}
            isLoading={isLoading || studentInfoAdditional.isLoading}
            searchTrigger={false}
        >
            {isLoading || studentInfoAdditional.isLoading ? (
                <Spin />
            ) : (
                <>
                    <Row className={styles.headersBlock}>
                        <Col lg={14} md={24} xs={24} sm={24} className={styles.infoBlock}>
                            <Row className={styles.baseRowContainer}>
                                <Col lg={4} className={styles.image}>
                                    <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
                                </Col>
                                <Col className={styles.infoContainer} lg={24}>
                                    <Row className={styles.title}>
                                        <Typography.Title level={1}>
                                            {student?.name ? student?.name : 'Имя не определено'}
                                        </Typography.Title>
                                        <Tooltip
                                            title={
                                                isVerifiedStudent
                                                    ? 'Родитель принял вашу заявку'
                                                    : 'Родитель пока не принял вашу заявку'
                                            }
                                        >
                                            <Image
                                                src={isVerifiedStudent ? parentAcceptedPhone : parentDeclinedPhone}
                                                alt={'Parent phone'}
                                                width={50}
                                            />
                                        </Tooltip>
                                    </Row>
                                    <Field
                                        fieldName={'Телефон ученика:'}
                                        fieldValue={student?.student_profile?.phone}
                                    />
                                    <Field fieldName={'Кружок:'} fieldValue={student?.circle?.name} />
                                    <div className={styles.stickyBlock}>
                                        <ActionBar
                                            actions={[
                                                <Button
                                                    key={'edit'}
                                                    className={styles.changeButton}
                                                    onClick={() => router.push(`/student/${uuid[0]}/change`)}
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
                        {student?.circle && (
                            <Col lg={10} md={24} xs={24} sm={24} className={styles.card}>
                                <div className={styles.text}>
                                    <Typography.Title level={2}>Семья</Typography.Title>
                                    <Field
                                        fieldName={'Номер для связи:'}
                                        fieldValue={student?.student_profile?.phone}
                                        defaultValue={'Не определено'}
                                        type='left'
                                    />
                                    <Field
                                        fieldName={'Телефон родителя:'}
                                        fieldValue={student?.student_profile?.parent_phones?.split(',')[0]}
                                        type='left'
                                    />
                                    <Field fieldName={'E-mail родителя:'} type='left' />
                                </div>
                            </Col>
                        )}
                    </Row>
                    <DeleteModal
                        isModalVisible={isModalVisible}
                        mutation={mutation}
                        setIsModalVisible={setIsModalVisible}
                        titleText={'Удалить обучающегося?'}
                        buttonText={'Удалить обучающегося'}
                        urlAfterDelete={'/student'}
                        dataField={'student_id'}
                    />
                </>
            )}
        </EmptyWrapper>
    )
}

export default CurrentStudent
