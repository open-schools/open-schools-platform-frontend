import React, { Ref, useCallback, useEffect } from 'react'
import { YMaps, Map } from '@pbe/react-yandex-maps'
import { Form, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import classnames from 'classnames'
import cities from '@public/cities.json'
import getConfig from 'next/config'
import { Input } from '@domains/common/components/input'
import { Select } from '@domains/common/components/select'

const MapComponent = () => {
    const {
        publicRuntimeConfig: {
            YandexMapApiKey: { key: YandexApiKey },
        },
    } = getConfig()

    const [form] = Form.useForm()
    const ymaps = React.useRef(null)
    const placemarkRef = React.useRef(null)
    const mapRef = React.useRef<any>(null)
    const setMapRef = useCallback((instance: Ref<any>) => {
        mapRef.current = instance
    }, [])
    const [address, setAddress] = React.useState('')
    const [mapState, setMapState] = React.useState({
        center: [56.838926, 60.605702],
        zoom: 10,
    })

    const createPlacemark = (coords) => {
        return new ymaps.current.Placemark(
            coords,
            {
                iconCaption: 'loading..',
            },
            {
                preset: 'islands#violetDotIconWithCaption',
                draggable: true,
            },
        )
    }

    const getAddress = (coords) => {
        placemarkRef.current.properties.set('iconCaption', 'loading..')
        ymaps.current.geocode(coords).then((res) => {
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

            if ((accurateAddress.match(/,/g) || []).length === 3) {
                const commaIndex = accurateAddress.indexOf(',')
                const currentCity = accurateAddress
                    .substring(commaIndex + 1, accurateAddress.indexOf(',', commaIndex + 1))
                    .trim()
                const newAddress = accurateAddress.substring(accurateAddress.indexOf(',', commaIndex + 1) + 1).trim()
                form.setFieldValue('address', newAddress)
                form.setFieldValue('city', currentCity)
            } else {
                const commaIndex = address.indexOf(',')
                const currentCity = address.slice(0, commaIndex).trim()
                const newAddress = address.slice(commaIndex + 1).trim()
                form.setFieldValue('address', newAddress)
                form.setFieldValue('city', currentCity)
            }

            placemarkRef.current.properties.set({
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

    const onMapClick = (e) => {
        const coords = e.get('coords')

        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords)
        } else {
            placemarkRef.current = createPlacemark(coords)
            mapRef.current.geoObjects.add(placemarkRef.current)
            placemarkRef.current.events.add('dragend', function () {
                getAddress(placemarkRef.current.geometry.getCoordinates())
            })
        }
        getAddress(coords)
    }

    const handleCityChange = (e) => {
        const selectedCity = cities.find((city) => city.name === e)

        if (selectedCity) {
            setMapState({
                center: selectedCity.coordinates,
                zoom: 12,
            })
            form.setFieldValue('city', selectedCity.name)
        } else {
            console.error('Город не найден')
        }
    }

    return (
        <YMaps query={{ apikey: YandexApiKey }}>
            <div>
                <Map
                    style={style}
                    modules={['Placemark', 'geocode', 'geoObject.addon.balloon']}
                    instanceRef={mapRef}
                    onLoad={(ymapsInstance) => (ymaps.current = ymapsInstance)}
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
            </div>
        </YMaps>
    )
}

export default MapComponent
