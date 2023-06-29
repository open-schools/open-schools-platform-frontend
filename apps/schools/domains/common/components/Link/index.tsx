import React from 'react'
import defaultStyles from './styles/default.module.scss'
import underliningStyles from './styles/underlining.module.scss'
import { typeLink } from '../../constants/Link'

interface CustomButtonProps {
    type?: 'linkDefault' | 'linkUnderlining',
    onClick?: () => void,
    text?: string,
}

interface Dictionary {
    [key: string]: any;
}

const linkStyleDictionary : Dictionary = {
    'linkDefault': defaultStyles,
    'linkUnderlining': underliningStyles,
}

export const Link: React.FC<CustomButtonProps> = (props) => {
    const { type = 'linkDefault', onClick , text } = props

    if (!typeLink.includes(type)) {
        return <a className={defaultStyles.link} onClick={onClick} data-testid="link">{text}</a>
    } else {
        return <a className={linkStyleDictionary[type]?.link} onClick={onClick} data-testid="link">{text}</a>
    }
}

