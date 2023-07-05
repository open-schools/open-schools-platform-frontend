import { typeImage } from 'domains/common/constants/Image'
import fullScreen from './styles/fullScreen.module.scss'
import {Image, ImageProps} from 'antd'
import React from 'react'

interface CustomImageProps extends ImageProps {
    type?: 'fullScreen',
    onClick?: () => void,
}

interface Dictionary {
    [key: string]: any;
}

const imageStyleDictionary: Dictionary = {
    'fullScreen': fullScreen,
}

export const CustomImage: React.FC<CustomImageProps> = (props) => {
    const { type = 'schoolDefault', onClick, ...restProps } = props

    if (!typeImage.includes(type)) {
        return <Image
            onClick={onClick}
            {...restProps}
        />
    } else //if (type in buttonStyleDictionary) {
    {
        if (type === 'fullScreen')
            return <div
                className={imageStyleDictionary[type]?.image}
                style={{ backgroundImage: `url(${restProps.src})` }}
                onClick={onClick}
            />

        return <Image
            className={imageStyleDictionary[type]?.image}
            onClick={onClick}
            {...restProps}
        />
    }
}

