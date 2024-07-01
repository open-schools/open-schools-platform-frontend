import { Form, Typography, Input as AntdInput, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '@domains/common/components/button'
import { useChangeCircleFormValidators } from './hooks'
import { useGetAllCirclesQuery } from '@domains/organization/redux/organizationApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { isValidFormCheck } from '@domains/common/utils/form'
import { CIRCLE_NAME, CIRCLE_ADDRESS, ADDRESS_ROOM } from './constants'
import classnames from 'classnames'
import { AimOutlined } from '@ant-design/icons'
import { Select } from '@domains/common/components/select'
import { useChangeCircleMutation, useGetCircleQuery } from '../../redux/circleApi'
import { getVarsForAddressColumn } from '@domains/common/utils/geo'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import MapAddressForm from '@domains/circle/components/addressForm'
import { ConfirmForm } from '@domains/circle/components/confirmForm'
import { mapSteps } from '@domains/circle/interfaces/mapStepsType'
import { FormMapSteps } from '@domains/circle/constants/Enums'

export const ChangeCircleForm = () => {
    const validators = useChangeCircleFormValidators()
    const { organizationId } = useOrganization()
    const [form] = Form.useForm()
    const [step, setStep] = useState<mapSteps>(FormMapSteps.Form)
    const [point, setPoint] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    const [mutation] = useChangeCircleMutation()

    const circleId = getUuidFromUrl()[0]

    const circleData = useGetCircleQuery({
        circle_id: circleId,
    })
    const currentCircle = circleData?.data?.circle

    const circlesData = useGetAllCirclesQuery({
        organization_id: organizationId,
    })
    const circlesAddresses = Array.from(
        new Set(circlesData?.data?.results.map((x) => getVarsForAddressColumn(x.address)[0])),
    )

    const initialValues = {
        [CIRCLE_NAME]: currentCircle?.name,
        [CIRCLE_ADDRESS]: getVarsForAddressColumn(currentCircle?.address ?? '')[0],
        [ADDRESS_ROOM]: getVarsForAddressColumn(currentCircle?.address ?? '')[1],
    }

    if (point) {
        circlesAddresses.unshift(point)
        form.setFieldValue(CIRCLE_ADDRESS, point)
    }

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [], initialValues))
    }

    useEffect(() => {
        validationCheck()
    }, [point, form.getFieldValue(CIRCLE_ADDRESS)])

    if (step === FormMapSteps.Form) {
        return !circleData.isLoading ? (
            <Row className={styles.mainRow}>
                <div className={styles.formContainer}>
                    <Form
                        form={form}
                        className={styles.table}
                        colon={false}
                        requiredMark={false}
                        onValuesChange={validationCheck}
                        onFinish={() => {
                            setPoint(form.getFieldValue(CIRCLE_ADDRESS))
                            setStep(FormMapSteps.Confirm)
                        }}
                        layout='vertical'
                    >
                        <Typography.Title level={1}>Редактирование кружка</Typography.Title>
                        <Form.Item
                            required={true}
                            label={
                                <span>
                                        <span className={styles.requiredMark}>*</span> Название
                                    </span>
                            }
                            name={CIRCLE_NAME}
                            className={styles.label}
                            rules={validators.name}
                            initialValue={initialValues[CIRCLE_NAME]}
                        >
                            <Input required={true} placeholder='Введите название кружка' />
                        </Form.Item>

                        <Row className={styles.complexInputContainer}>
                            {!circlesData.isLoading ? (
                                <>
                                    <AntdInput.Group compact className={styles.complexInput}>
                                        <Form.Item
                                            required={true}
                                            label={
                                                <span>
                                                    <span className={styles.requiredMark}>*</span> Адрес
                                                </span>
                                            }
                                            name={CIRCLE_ADDRESS}
                                            initialValue={initialValues[CIRCLE_ADDRESS]}
                                            className={classnames(styles.label, styles.address)}
                                            rules={validators.address}
                                        >
                                            <Select
                                                placeholder='Выберите адрес кружка'
                                                customType={'selectInput'}
                                                className={styles.select}
                                                loading={circlesData.isLoading}
                                                options={circlesAddresses?.map((address: string | undefined) => {
                                                    return {
                                                        value: address,
                                                        label: address,
                                                    }
                                                })}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label={'Помещение'}
                                            name={ADDRESS_ROOM}
                                            className={classnames(styles.label, styles.room)}
                                            initialValue={initialValues[ADDRESS_ROOM]}
                                            rules={validators.room}
                                        >
                                            <Input className={styles.input} placeholder='Помещение и номер' />
                                        </Form.Item>
                                    </AntdInput.Group>

                                    <Button
                                        className={styles.mapButton}
                                        onClick={() => {
                                            setPoint(form.getFieldValue(CIRCLE_ADDRESS))
                                            setStep(FormMapSteps.Map)
                                        }}
                                        antdType={'text'}
                                        icon={<AimOutlined />}
                                    >
                                        Выбрать на карте
                                    </Button>
                                </>
                            ) : (
                                <Spin></Spin>
                            )}
                        </Row>

                        <Form.Item name='button'>
                            <Button
                                disabled={!isFormValid}
                                key='submit'
                                type='schoolDefault'
                                htmlType='submit'
                                block
                                data-cy='resetcomplete-button'
                                className={styles.button}
                            >
                                Подтвердить изменения
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Row>
        ) : (
            <Spin></Spin>
        )
    } else if (step === FormMapSteps.Map) {
        return (
            <MapAddressForm
                setStep={setStep}
                point={point ? point : initialValues[CIRCLE_ADDRESS]}
                setPoint={setPoint}
            />
        )
    } else {
        return (
            <ConfirmForm
                setStep={setStep}
                point={point ? point : circlesAddresses[0]}
                mode={'Change'}
                form={form}
                mutation={mutation}
            />
        )
    }
}
