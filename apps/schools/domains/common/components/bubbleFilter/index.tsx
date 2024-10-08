import React from 'react'
import { Row, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { BubbleFilterProps, BubbleFilterListItem } from '@domains/common/components/bubbleFilter/interface'
import { CloseOutlined } from '@ant-design/icons'

export const BubbleFilter: React.FC<BubbleFilterProps> = React.memo(({ text, items, statuses }) => {
    const listItems = items.map((item: BubbleFilterListItem) => {
        const isSelected = statuses?.includes(item.key) ?? false
        return item.count && item.count > 0 ? (
            <Row
                className={isSelected ? styles.bubbleContainerSelected : styles.bubbleContainer}
                onClick={isSelected ? () => {} : item.onClick}
                style={{ backgroundColor: item.isSelected ? item.color : '' }}
                key={item.key}
            >
                {item.count && (
                    <div className={styles.circle} style={{ backgroundColor: item.isSelected ? '' : item.color }}>
                        {item.count}
                    </div>
                )}
                <div className={styles.bubbleText}>{item.text}</div>
                {item.isSelected && <CloseOutlined onClick={item.onExit} className={styles.closeIcon} />}
            </Row>
        ) : null
    })

    return (
        <Row className={styles.container}>
            {text && <Typography.Text className={styles.text}>{text}</Typography.Text>}
            {listItems}
        </Row>
    )
})
