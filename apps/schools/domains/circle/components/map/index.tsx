// @ts-nocheck

import React from 'react'
import { YMaps, Map, YMapsApi } from 'react-yandex-maps'
import {Form, message, Row, Typography} from 'antd'
import styles from './styles/styles.module.scss'
import classnames from 'classnames'
import cities from '@public/cities.json'
import getConfig from 'next/config'
import { Input } from '@domains/common/components/input'
import { Select } from '@domains/common/components/select'
import { placeMarkSvg } from '@domains/common/components/Icons/placeMarkSvg'
import {Button} from "@domains/common/components/button";

interface MapComponentProps {
    setPoint?: React.Dispatch<React.SetStateAction<string>>
    setStep?: React.Dispatch<React.SetStateActionn<"Form" | "Map">>
    point?: string
}

const MapComponent = (props: MapComponentProps) => {
    const {
        publicRuntimeConfig: {
            YandexMapApiKey: { key: YandexApiKey },
        },
    } = getConfig()

    const { point, setPoint,setStep } = props

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
                    zoom: 10,
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
                form.setFieldValue('address', streetAddress)
                form.setFieldValue('city', currentCity)
            } else {
                const commaIndex = accurateAddress.indexOf(',')
                const currentCity = accurateAddress.slice(0, commaIndex).trim()
                const newAddress = accurateAddress.slice(commaIndex + 1).trim()
                form.setFieldValue('address', newAddress)
                form.setFieldValue('city', currentCity)
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

    const onMapClick = (e: { get: (prop: string) => any }) => {
        const coords = e.get('coords')

        if (placeMarkRef.current) {
            placeMarkRef.current.geometry.setCoordinates(coords)
        } else {
            placeMarkRef.current = createPlaceMark(coords)
            mapRef.current.geoObjects.add(placeMarkRef.current)
            placeMarkRef.current.events.add('dragend', function () {
                getAddress(placeMarkRef.current.geometry.getCoordinates())
            })
        }
        getAddress(coords)
    }

    const handleCityChange = (handleCity: string) => {
        const selectedCity = cities.find((city) => city.name === handleCity)

        if (selectedCity) {
            setMapState({
                center: selectedCity.coordinates,
                zoom: 12,
            })
            form.setFieldValue('city', selectedCity.name)
        } else {
            message.error('Город не найден')
        }
    }

    return (
        <YMaps query={{ apikey: YandexApiKey }}>
            <div>
                <Map
                    style={style}
                    modules={['templateLayoutFactory', 'Placemark', 'geocode', 'geoObject.addon.balloon']}
                    instanceRef={mapRef}
                    onLoad={(ymapsInstance) => initialYMaps(ymapsInstance)}
                    onClick={onMapClick}
                    state={mapState}
                >
                    <Form form={form} initialValues={{ address: address }} className={styles.form} layout='vertical'>
                        <Typography.Title level={1}>Адрес</Typography.Title>
                        <Typography.Title level={5}>
                            Добавьте на карте место, где будут проходить занятия
                        </Typography.Title>
                        <Form.Item
                            label={<span>Город</span>}
                            name={'city'}
                            initialValue={cities[290].name}
                            className={classnames(styles.label, styles.address)}
                        >
                            <Select
                                customType={'selectInput'}
                                placeholder='Выберите адрес кружка'
                                className={styles.select}
                                options={cities.map((city: any) => {
                                    return {
                                        value: city.name,
                                        label: city.name,
                                    }
                                })}
                                onChange={handleCityChange}
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
                    <Button className={styles.cancelButton} onClick={() => setStep('Form')}>
                        Назад
                    </Button>
                    <Button className={styles.saveButton} onClick={() => {
                        setPoint(form.getFieldValue('city') + ', ' + form.getFieldValue('address'))
                        setStep('Form')
                    }}>
                        Сохранить
                    </Button>
                </Row>
            </div>
        </YMaps>
    )
}

export default MapComponent
