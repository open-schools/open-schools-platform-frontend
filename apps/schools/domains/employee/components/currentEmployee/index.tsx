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
import { useDeleteEmployeeByIdMutation, useGetEmployeeQuery } from '@domains/employee/redux/employeeApi'

const CurrentEmployee = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [mutation, isDeleteFinished] = useDeleteEmployeeByIdMutation()
    const uuid = getUuidFromUrl()

    const {
        data: employee,
        error: employeeError,
        isLoading,
    } = useGetEmployeeQuery({
        employee_id: uuid[0],
    })

    useEffect(() => {
        if (employeeError && (employeeError as ErrorType).status == 404) {
            router.push('/employee')
        }
    }, [employeeError])

    if (isDeleteFinished.isSuccess) return null
    if (uuid.length === 0) router.push('/404')

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
                            {employee?.employee.name ? employee?.employee.name : 'Имя не определено'}
                        </Typography.Title>
                        <Field
                            fieldName={'Телефон сотрудника:'}
                            fieldValue={employee?.employee?.phone}
                            defaultValue={'Не определено'}
                        />
                        <Field
                            fieldName={'E-mail сотрудника:'}
                            fieldValue={employee?.employee.email}
                            defaultValue={'Не определено'}
                        />
                        <Field
                            fieldName={'Должность:'}
                            fieldValue={employee?.employee.position}
                            defaultValue={'Не определено'}
                        />
                        <div className={styles.stickyBlock}>
                            <ActionBar
                                actions={[
                                    <Button
                                        key={'edit'}
                                        className={styles.changeButton}
                                        onClick={() => router.push(`/employee/${uuid[0]}/change`)}
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
                titleText={'Удалить сотрудника?'}
                buttonText={'Удалить сотрудника'}
                urlAfterDelete={'/employee'}
                dataField={'employee_id'}
            />
        </>
    )
}

export default CurrentEmployee
