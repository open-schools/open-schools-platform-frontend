import React from 'react'
import styles from './styles/image.module.scss'
import Image from 'next/image'

interface CustomImageProps {
    width?: number,
    height?: number,
    type?: 'imageDefault',
}

export const Images: React.FC<CustomImageProps> = (props) => {
    const { width, height, type } = props

    return <Image width={width} height={height} className={styles.image} src={'/image/authImage.jpg'} alt={'Image'} />
}

