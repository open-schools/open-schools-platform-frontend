import { Form, Typography, Input as AntdInput, Row, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '@domains/common/components/button'
import { useCreateCircleFormValidators } from './hooks'
import { useGetAllCirclesQuery } from '@domains/organization/redux/organizationApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { WithTooltip } from '@domains/common/components/tooltip/withTooltip'
import { TOOLTIP_MARGIN } from './styles/styles'
import { isValidFormCheck } from '@domains/common/utils/form'
import { CIRCLE_NAME, CIRCLE_ADDRESS, ADDRESS_ROOM } from './constants'
import classnames from 'classnames'
import { AimOutlined, QuestionCircleFilled } from '@ant-design/icons'
import { Select } from '@domains/common/components/select'
import { useCreateCircleMutation } from '../../redux/circleApi'
import { getVarsForAddressColumn } from '@domains/common/utils/geo'
import MapAddressForm from '@domains/circle/components/addressForm'
import { ConfirmForm } from '@domains/circle/components/confirmForm'
import { mapSteps } from '@domains/circle/interfaces/mapStepsType'
import { FormMapSteps } from '@domains/circle/constants/Enums'
import Image from 'next/image'
import android from '@public/image/Android 11.png'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_MARGIN,
    DEFAULT_OVERLAY_INNER_COLOR,
    DEFAULT_OVERLAY_INNER_STYLE,
    ICON_SIZES,
} from '@domains/common/components/tooltip/styles/styles'

export const CreateCircleForm = () => {
    const validators = useCreateCircleFormValidators()
    const [step, setStep] = useState<mapSteps>(FormMapSteps.Form)
    const [point, setPoint] = useState('')
    const { organization } = useOrganization()
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const [mutation] = useCreateCircleMutation()
    const circlesData = useGetAllCirclesQuery({
        organization_id: organization.id,
    })
    const circlesAddresses = Array.from(
        new Set(circlesData?.data?.results.map((x) => getVarsForAddressColumn(x.address)[0])),
    )

    if (point) {
        circlesAddresses.unshift(point)
        form.setFieldValue(CIRCLE_ADDRESS, point)
    }

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [CIRCLE_NAME, CIRCLE_ADDRESS]))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])

    useEffect(() => {
        validationCheck()
    }, [point, form.getFieldValue(CIRCLE_ADDRESS)])

    if (step === FormMapSteps.Form) {
        return (
            <div className={styles.mainRow}>
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
                        <Typography.Title level={1}>Добавление кружка</Typography.Title>
                        <div className={styles.nameInput}>
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
                            >
                                <Input
                                    required={true}
                                    inputContainerClass={styles.inputWithTooltipContainer}
                                    className={styles.inputWithTooltip}
                                    placeholder='Введите название кружка'
                                >
                                    <div className={styles.tooltipContainer}>
                                        <Tooltip
                                            placement='right'
                                            title={'Здесь будет текст тултипа'}
                                            color={DEFAULT_OVERLAY_INNER_COLOR}
                                            style={{ height: 'auto' }}
                                            overlayInnerStyle={DEFAULT_OVERLAY_INNER_STYLE}
                                        >
                                            <QuestionCircleFilled
                                                style={{
                                                    top: `${TOOLTIP_MARGIN}`,
                                                    marginBottom: '10px',
                                                    fontSize: ICON_SIZES[DEFAULT_ICON_SIZE],
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                </Input>
                            </Form.Item>
                        </div>

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
                                            initialValue={circlesAddresses[0]}
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
                                            initialValue={''}
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
                                Подтвердить адрес кружка
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.mobileApp}>
                    <Typography.Title level={3}>Приложение родителей</Typography.Title>
                    <Typography.Title level={3} className={styles.text}>
                        Родители смогут увидеть ваш кружок с помощью карты и узнать информацию о нём!
                    </Typography.Title>
                    <div className={styles.mobile}>
                        <Image src={android} alt={'Android with app'} className={styles.mobileImage} />
                    </div>
                </div>
            </div>
        )
    } else if (step === FormMapSteps.Map) {
        return <MapAddressForm setStep={setStep} point={point ? point : circlesAddresses[0]} setPoint={setPoint} />
    } else {
        return (
            <ConfirmForm
                setStep={setStep}
                point={point ? point : circlesAddresses[0]}
                mode={'Create'}
                form={form}
                mutation={mutation}
            />
        )
    }
}
