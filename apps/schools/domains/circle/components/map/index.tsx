// @ts-nocheck

import React from 'react'
import { YMaps, Map } from 'react-yandex-maps'
import { Form, message, Typography } from 'antd'
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
    const placeMarkRef = React.useRef(null)
    const mapRef = React.useRef<any>(null)
    const [address, setAddress] = React.useState('')
    const [mapState, setMapState] = React.useState({
        center: [56.838926, 60.605702],
        zoom: 10,
    })

    const createPlaceMark = (coords: number[]) => {
        const placeMarkSvg = `<svg width="61" height="78" viewBox="0 0 61 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_3861_12336)">
        <path d="M30.5 2C15.8493 2 4 12.955 4 26.5C4 44.875 30.5 72 30.5 72C30.5 72 57 44.875 57 26.5C57 12.955 45.1507 2 30.5 2Z" fill="#1890FF"/>
        </g>
        <g clip-path="url(#clip0_3861_12336)">
        <path d="M30.1918 20.1174C30.0235 20.1811 29.5797 20.3494 29.2065 20.4908C28.8334 20.6321 27.6495 21.0805 26.5766 21.487C23.5238 22.6437 23.1762 22.7745 22.7751 22.9263C22.568 23.0048 22.0551 23.1994 21.6347 23.3581C21.2142 23.5178 20.7068 23.7097 20.5059 23.7856C20.3057 23.8615 19.7975 24.0534 19.3771 24.213C18.9566 24.3727 18.4748 24.555 18.3064 24.6178L18 24.7338L18.0465 24.7513C18.1055 24.774 20.3228 25.6201 20.5912 25.7222C20.8821 25.833 21.6634 26.1313 22.1583 26.3197C22.3934 26.4096 22.7844 26.5588 23.0272 26.6512C23.6401 26.885 25.3935 27.5532 27.7635 28.457C28.8667 28.8775 29.935 29.2848 30.1383 29.3625L30.5068 29.5029L31.1507 29.2578C31.5045 29.1226 32.0732 28.9054 32.4145 28.7754C32.9576 28.5678 33.4401 28.3837 34.1756 28.1037C34.2865 28.0609 34.6915 27.9074 35.0755 27.7609C35.9072 27.4442 37.1221 26.9801 38.6598 26.3939C39.2789 26.1575 39.8755 25.9298 39.9864 25.8879C40.0973 25.8461 40.396 25.7318 40.6497 25.635C41.2502 25.4064 41.8282 25.1857 42.4535 24.9476C43.0121 24.7347 43.0043 24.7373 42.9989 24.7321C42.9973 24.7295 42.6986 24.6152 42.3363 24.4782C40.244 23.6861 39.1687 23.2788 37.9034 22.7998C37.1663 22.5207 36.8157 22.3881 36.0375 22.0932C35.8374 22.0174 35.1601 21.7609 34.5325 21.5236C30.634 20.0467 30.5091 19.9996 30.5029 20.0005C30.5006 20.0005 30.3602 20.0528 30.1918 20.1174Z" fill="#EDF6FF"/>
        <path d="M22.5278 31.5921C22.5278 33.6159 22.5255 35.2891 22.5232 35.3117C22.4976 35.5237 22.7644 35.8569 23.2268 36.1893C24.0407 36.7747 25.3525 37.3251 26.7715 37.6775C28.3138 38.0596 29.912 38.2053 31.469 38.105C33.5559 37.9706 35.6607 37.4027 37.1712 36.5653C38.0114 36.0995 38.5227 35.5996 38.4707 35.2934C38.4606 35.2315 38.4606 35.2228 38.4746 35.2228C38.4847 35.2228 38.4862 34.811 38.4862 31.5676C38.4862 29.5569 38.4847 27.9125 38.4831 27.9125C38.4815 27.9125 38.3054 27.9788 38.0929 28.0599C37.8803 28.1411 36.6747 28.6008 35.414 29.0815C33.1199 29.9564 32.6475 30.1361 31.7987 30.4598C31.5489 30.5548 31.2006 30.6874 31.0245 30.7546C30.8484 30.8227 30.6792 30.8837 30.6482 30.8916C30.6141 30.9012 30.5598 30.9064 30.507 30.9064C30.4543 30.9064 30.4 30.9012 30.3658 30.8916C30.3348 30.8837 30.1657 30.8227 29.9896 30.7546C29.8134 30.6874 29.4705 30.5566 29.2269 30.4641C28.9841 30.3717 28.4744 30.1771 28.0943 30.0323C27.2447 29.7087 27.0345 29.6284 26.7327 29.5133C26.6024 29.4644 25.6047 29.0841 24.5154 28.668C23.4262 28.2527 22.5333 27.9125 22.5309 27.9125C22.5294 27.9125 22.5278 29.5682 22.5278 31.5921Z" fill="#EDF6FF"/>
        </g>
        <defs>
        <filter id="filter0_d_3861_12336" x="0" y="0" width="61" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3861_12336"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3861_12336" result="shape"/>
        </filter>
        <clipPath id="clip0_3861_12336">
        <rect width="25" height="18.1353" fill="white" transform="translate(18 20)"/>
        </clipPath>
        </defs>
        </svg>
`
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
