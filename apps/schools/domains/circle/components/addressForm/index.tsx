import React from 'react'
import { Row, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import MapComponent from '@domains/circle/components/map'
import { Button } from '@domains/common/components/button'
import { useRouter } from "next/router";

const AddressForm = () => {
    const router = useRouter()

    return (
        <div className={styles.container}>
            <Typography.Title level={1}>Добавление кружка</Typography.Title>
            <Typography.Title level={4}>
                Выберите на карте расположение кружка, для этого: выберете город, найдите нужную улицу, дом и нажмите на
                него
            </Typography.Title>
            <MapComponent />
            <Row className={styles.buttonContainer}>
                <Button className={styles.cancelButton} onClick={() => router.push('./')}>
                    Назад
                </Button>
                <Button className={styles.saveButton} onClick={() => router.push('./')}>
                    Сохранить
                </Button>
            </Row>
        </div>
    )
}

export default AddressForm
