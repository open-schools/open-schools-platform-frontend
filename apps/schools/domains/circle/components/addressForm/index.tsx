import React from 'react'
import { Row, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import MapComponent from '@domains/circle/components/map'
import { Button } from '@domains/common/components/button'

interface AddressFormProps {
    setStep: React.Dispatch<React.SetStateAction<"Form" | "Map">>
    setPoint?: React.Dispatch<React.SetStateAction<string>>
    point?: string
}

const AddressForm = (props:  AddressFormProps) => {
    const { setStep, setPoint, point } = props

    return (
        <div className={styles.container}>
            <Typography.Title level={1}>Добавление кружка</Typography.Title>
            <Typography.Title level={4}>
                Выберите на карте расположение кружка, для этого: выберете город, найдите нужную улицу, дом и нажмите на
                него
            </Typography.Title>
            <MapComponent setPoint={setPoint} point={point}/>
            <Row className={styles.buttonContainer}>
                <Button className={styles.cancelButton} onClick={() => setStep('Form')}>
                    Назад
                </Button>
                <Button className={styles.saveButton} onClick={() => setStep('Form')}>
                    Сохранить
                </Button>
            </Row>
        </div>
    )
}

export default AddressForm
