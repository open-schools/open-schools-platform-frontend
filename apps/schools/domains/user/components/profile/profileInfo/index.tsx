import React, { useEffect } from 'react'
import router from 'next/router'
import { Col, Row, Spin, Typography } from 'antd'
import { Button } from '@domains/common/components/button'
import styles from './styles/styles.module.scss'
import Image from 'next/image'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { useUserProfile } from '@domains/user/providers/authProvider'
import { useLazyGetAllEmployeesQuery } from '@domains/employee/redux/employeeApi'

export function ProfileInfo() {
    const { user } = useUserProfile()

    const [getEmployees, results] = useLazyGetAllEmployeesQuery()

    useEffect(() => {
        if (user.employee_profile)
            getEmployees({
                employee_profile: user?.employee_profile?.id,
            })
    }, [user.employee_profile])

    return (
        <Row className={styles.baseRowContainer}>
            <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
            <Col className={styles.infoContainer}>
                <Typography.Title className={styles.title} level={1}>
                    {user.employee_profile?.name ? user.employee_profile?.name : 'Имя не определено'}
                </Typography.Title>
                <Row gutter={[0, 20]} className={styles.itemContainer}>
                    <Col className={styles.fieldName} lg={10} xs={10}>
                        Телефон:
                    </Col>
                    <Col className={styles.fieldValue} lg={10} xs={10} offset={2}>
                        {user.phone}
                    </Col>
                </Row>

                <Row gutter={[0, 24]} className={styles.itemContainer}>
                    <Col className={styles.fieldName} lg={10} xs={10}>
                        E-mail:
                    </Col>
                    <Col className={styles.fieldValue} lg={10} xs={10} offset={2}>
                        {user.employee_profile?.email ? user.employee_profile?.email : 'Не определено'}
                    </Col>
                </Row>

                <Row gutter={[0, 24]} className={styles.itemContainer} style={{ marginBottom: '50px' }}>
                    <Col className={styles.fieldName} lg={10} xs={10}>
                        Пароль:
                    </Col>
                    <Col className={styles.fieldValue} lg={10} xs={10} offset={2}>
                        *********
                    </Col>
                </Row>

                {results.isLoading ? (
                    <div className={styles.itemContainer}>
                        <Spin />
                    </div>
                ) : (
                    results.data?.results.map((employee) => (
                        <div key={employee.id}>
                            <Row gutter={[0, 24]} className={styles.itemContainer}>
                                <Col className={styles.fieldName} lg={10} xs={10}>
                                    Организация:
                                </Col>
                                <Col className={styles.fieldValue} lg={10} xs={10} offset={2}>
                                    {employee.organization__name}
                                </Col>
                            </Row>

                            <Row gutter={[0, 24]} className={styles.itemContainer} style={{ marginBottom: '50px' }}>
                                <Col className={styles.fieldName} lg={10} xs={10}>
                                    Должность:
                                </Col>
                                <Col className={styles.fieldValue} lg={10} xs={10} offset={2}>
                                    {employee.position ? employee.position : 'Не определено'}
                                </Col>
                            </Row>
                        </div>
                    ))
                )}

                <Button type='schoolDefaultAuto' block onClick={() => router.push('/user/edit')}>
                    Редактировать профиль
                </Button>
            </Col>
        </Row>
    )
}
