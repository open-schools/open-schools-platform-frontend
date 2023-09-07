import React from 'react'
import { YMaps, Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps'
import { Form } from 'antd'
import styles from './styles/styles.module.scss'
import { Input } from '@domains/common/components/input'

const points = [
    {
        coordinates: [56.841561, 60.615063],
        content: 'Кружок1',
    },
]

const MapComponent = () => {
    const [form] = Form.useForm()

    const style: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '600px',
    }

    return (
        <YMaps>
            <div>
                {/* Центр Екатеринбурга center: [56.8519, 60.6122], сейчас стоит Тургенева 4*/}
                <Map style={style} defaultState={{ center: [56.841561, 60.615063], zoom: 15 }}>
                    <Form form={form} className={styles.form} colon={false} requiredMark={false} layout='vertical'>
                        <Form.Item required={true} className={styles.label}>
                            <Input required={true} placeholder='Введите название кружка' />
                        </Form.Item>
                    </Form>
                    <ZoomControl options={{ size: 'small', position: { bottom: 100, right: 10 } }} />
                    {points.map((point, index) => (
                        <Placemark
                            geometry={point.coordinates}
                            key={index}
                            properties={{ iconCaption: point.content }}
                        />
                    ))}
                </Map>
            </div>
        </YMaps>
    )
}

export default MapComponent
