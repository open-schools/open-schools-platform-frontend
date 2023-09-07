import React from 'react'
import { Typography } from 'antd'
import styles from './styles/styles.module.scss'
import MapComponent from '@domains/circle/components/map'

const AddressForm = () => {
    return (
        <div className={styles.container}>
            <Typography.Title level={1}>Добавление кружка</Typography.Title>
            <Typography.Title level={4}>
                Выберите на карте расположение кружка, для этого: выберете город, найдите нужную улицу, дом и нажмите на
                него
            </Typography.Title>
            <MapComponent />
        </div>
    )
}

export default AddressForm
