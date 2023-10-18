import React from 'react'
import styles from './styles/styles.module.scss'
import { FormInstance, Typography } from 'antd'
import ConfirmMap from '@domains/circle/components/map/confirmMap'
import { mapSteps } from "@domains/circle/interfaces/mapStepsType";

interface ConfirmFormProps {
    mode: 'Change' | 'Create'
    setStep: React.Dispatch<React.SetStateAction<mapSteps>>
    point?: string
    form: FormInstance
    mutation: any
}

export const ConfirmForm = (props: ConfirmFormProps) => {
    const { setStep, point, form, mutation, mode } = props

    return (
        <div className={styles.container}>
            <Typography.Title level={1}>Подтверждение адреса кружка</Typography.Title>
            <ConfirmMap mode={mode} mutation={mutation} mainForm={form} point={point} setStep={setStep} />
        </div>
    )
}
