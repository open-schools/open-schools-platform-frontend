import React from 'react'
import styles from './styles/styles.module.scss'
import classnames from 'classnames'
import { CustomLogo } from '../../../Logo'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { LOGO_WIDTH } from './constants'
import {IconProps} from "./interfaces";


export const Icon: React.FC<IconProps> = (props) => {
    const { collapsed, setCollapsed } = props

    return <div className={styles.sidebar}>
        <div
            className={classnames(
                styles.logo,
                collapsed
                    ? styles.logoMarginCollapsed
                    : styles.logoMargin
            )}
        >
            <CustomLogo minified={collapsed} width={LOGO_WIDTH} />
        </div>
        <div className={styles.trigger}>
            <div className={styles.triggerOutline}>
                {React.createElement(
                    collapsed ? RightOutlined : LeftOutlined,
                    {
                        onClick: () => setCollapsed(!collapsed),
                    }
                )}
            </div>
        </div>
    </div>
}