// @ts-nocheck

import React from 'react'
import styles from './styles/styles.module.scss'
import getConfig from 'next/config'
import { Form, FormInstance, Row, Typography } from 'antd'
import { Map, YMaps, YMapsApi } from 'react-yandex-maps'
import { placeMarkSvg } from '@domains/common/components/Icons/placeMarkSvg'
import classnames from 'classnames'
import { Input } from '@domains/common/components/input'
import { Button } from '@domains/common/components/button'
import { CIRCLE_NAME } from '@domains/circle/components/createCircleForm/constants'
import { handleSubmitForm as handleSubmitCreateForm } from '@domains/circle/handlers/circleCreate'
import { handleSubmitForm as handleSubmitUpdateForm } from '@domains/circle/handlers/circleUpdate'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import { mapSteps } from '@domains/circle/interfaces/mapStepsType'
import { FormMapSteps } from '@domains/circle/constants/Enums'
import router from 'next/router'

interface MapComponentProps {
    mode: 'Change' | 'Create'
    setStep: React.Dispatch<React.SetStateAction<mapSteps>>
    point?: string
    mainForm: FormInstance
    mutation: any
}

const ConfirmMap = (props: MapComponentProps) => {
    const {
        publicRuntimeConfig: {
            YandexMapApiKey: { key: YandexApiKey },
        },
    } = getConfig()

    const { point, setStep, mainForm, mutation, mode } = props

    const circleId = getUuidFromUrl()[0]
    const { organizationId } = useOrganization()
    const [form] = Form.useForm()
    const ymaps = React.useRef(null)
    const placeMarkRef = React.useRef(null)
    const mapRef = React.useRef<any>(null)
    const [address, setAddress] = React.useState('')
    const [mapState, setMapState] = React.useState({
        center: [56.838926, 60.605702],
        zoom: 10,
    })

    const initialYMaps = (Ymap: YMapsApi) => {
        ymaps.current = Ymap

        if (point) {
            const temp = ymaps.current.geocode(point)
            temp.then(function (response) {
                const coords = response.geoObjects.get(0).geometry._coordinates

                placeMarkRef.current = createPlaceMark(coords)
                mapRef.current.geoObjects.add(placeMarkRef.current)
                placeMarkRef.current.events.add('dragend', function () {
                    getAddress(placeMarkRef.current.geometry.getCoordinates())
                })

                getAddress(coords)
                setMapState({
                    center: coords,
                    zoom: 15,
                })
            })
        }
    }

    const createPlaceMark = (coords: number[]) => {
        const customIconLayout = ymaps.current.templateLayoutFactory.createClass(
            `<div style="background-color: transparent; width: 50px; height: 50px; margin-left: -30px; margin-top: -80px">
                ${placeMarkSvg}
            </div>`,
        )

        return new ymaps.current.Placemark(
            coords,
            {
                iconCaption: 'loading..',
            },
            {
                iconLayout: customIconLayout,
                draggable: true,
            },
        )
    }

    const getAddress = (coords: number[]) => {
        placeMarkRef.current.properties.set('iconCaption', 'loading..')
        ymaps.current.geocode(coords).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0)

            const accurateAddress = firstGeoObject.getAddressLine()

            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ]
                .filter(Boolean)
                .join(', ')

            setAddress(newAddress)

            if ((accurateAddress.match(/,/g) || []).length !== 2 && (accurateAddress.match(/,/g) || []).length !== 1) {
                const commaIndex = accurateAddress.indexOf(',')
                const currentCity = accurateAddress
                    .substring(commaIndex + 1, accurateAddress.indexOf(',', commaIndex + 1))
                    .trim()
                const streetAddress = accurateAddress.substring(accurateAddress.indexOf(',', commaIndex + 1) + 1).trim()
                form.setFieldValue('address', `${currentCity}, ${streetAddress}`)
            } else {
                const commaIndex = accurateAddress.indexOf(',')
                const currentCity = accurateAddress.slice(0, commaIndex).trim()
                const newAddress = accurateAddress.slice(commaIndex + 1).trim()
                form.setFieldValue('address', `${currentCity}, ${newAddress}`)
            }

            placeMarkRef.current.properties.set({
                iconCaption: newAddress,
                balloonContent: firstGeoObject.getAddressLine(),
            })
        })
    }

    const style: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '600px',
    }

    return (
        <YMaps query={{ apikey: YandexApiKey }}>
            <div>
                <Map
                    style={style}
                    modules={['templateLayoutFactory', 'Placemark', 'geocode', 'geoObject.addon.balloon']}
                    instanceRef={mapRef}
                    onLoad={(ymapsInstance) => initialYMaps(ymapsInstance)}
                    state={mapState}
                >
                    <Form form={form} className={styles.form} layout='vertical'>
                        <Typography.Title level={1}>Кружок</Typography.Title>
                        <Form.Item
                            label={'Название кружка'}
                            name={'name'}
                            initialValue={mainForm.getFieldValue(CIRCLE_NAME)}
                            className={classnames(styles.label, styles.address)}
                        >
                            <Input
                                className={styles.input}
                                disabled={true}
                                value={mainForm.getFieldValue(CIRCLE_NAME)}
                            />
                        </Form.Item>

                        <Form.Item
                            label={'Адрес'}
                            name={'address'}
                            className={classnames(styles.label, styles.room)}
                            initialValue={address}
                        >
                            <Input className={styles.input} disabled={true} value={address} />
                        </Form.Item>
                    </Form>
                </Map>
                <Row className={styles.buttonContainer}>
                    <Button
                        className={styles.addButton}
                        onClick={() => {
                            if (mode === 'Create') {
                                handleSubmitCreateForm(organizationId, mainForm, mutation).then((isSucceed) => {
                                    if (isSucceed) router.push('/circle')
                                })
                            } else if (mode === 'Change') {
                                handleSubmitUpdateForm(circleId, mainForm, mutation).then((isSucceed) => {
                                    if (isSucceed) router.push(`/circle/${circleId}`)
                                })
                            }
                        }}
                    >
                        {mode === 'Create' ? 'Добавить кружок' : 'Принять изменения'}
                    </Button>
                    <Button
                        className={styles.changeAddressButton}
                        onClick={() => {
                            setStep(FormMapSteps.Map)
                        }}
                    >
                        Изменить адрес
                    </Button>
                    <Button className={styles.cancelButton} onClick={() => setStep(FormMapSteps.Form)}>
                        Назад
                    </Button>
                </Row>
            </div>
        </YMaps>
    )
}

export default ConfirmMap
