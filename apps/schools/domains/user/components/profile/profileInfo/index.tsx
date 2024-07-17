import React, { useEffect } from 'react'
import router from 'next/router'
import { Col, Row, Spin, Typography } from 'antd'
import { Button } from '@domains/common/components/button'
import styles from './styles/styles.module.scss'
import Image from 'next/image'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { useUserProfile } from '@domains/user/providers/authProvider'
import { useLazyGetAllEmployeesQuery } from '@domains/employee/redux/employeeApi'
import { Field } from '@domains/common/components/field'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

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
                <Field fieldName={'Телефон:'} fieldValue={user.phone} defaultValue={'Не определено'} />
                <Field fieldName={'E-mail:'} fieldValue={user.employee_profile?.email} defaultValue={'Не определено'} />
                <Field fieldName={'Пароль:'} fieldValue={'*********'} />

                {results.isLoading ? (
                    <div className={styles.itemContainer}>
                        <Spin />
                    </div>
                ) : (
                    results.data?.results.map((employee) => (
                        <div key={employee.id} className={styles.organizationContainer}>
                            <Field
                                fieldName={'Организация:'}
                                fieldValue={employee.organization__name}
                                type={'right'}
                            />
                            <Field
                                fieldName={'Должность:'}
                                fieldValue={employee.position}
                                defaultValue={'Не определено'}
                                type={'right'}
                            />
                        </div>
                    ))
                )}

                <Button className={styles.editButton} type='schoolDefaultAuto' block onClick={() => router.push(RoutePath[AppRoutes.USER_EDIT])}>
                    Редактировать профиль
                </Button>
            </Col>
        </Row>
    )
}
