import React from 'react'
import { Modal as DefaultModal } from 'antd'

import { DISPLAY_NONE } from '@domains/common/components/styles/constantStyles'

import { CustomModalProps } from './interfaces'
import styles from './styles/styles.module.scss'
import { Button } from '@domains/common/components/button'
import { handleDeleteButtonClick } from "@domains/common/handlers/deleteModal";

const DeleteModal: React.FC<CustomModalProps> = (props) => {
    const {
        isModalVisible,
        setIsModalVisible,
        children,
        bodyText = 'Восстановить будет невозможно',
        buttonText,
        titleText,
        mutation,
        urlAfterDelete,
        dataField,
        ...restProps
    } = props

    return (
        <DefaultModal
            open={isModalVisible}
            className={styles.modal}
            title={titleText}
            centered={true}
            cancelButtonProps={{ style: DISPLAY_NONE }}
            onCancel={() => setIsModalVisible(false)}
            footer={[
                <Button
                    antdType={'ghost'}
                    className={styles.deleteButton}
                    key='submit'
                    danger
                    onClick={() => handleDeleteButtonClick(setIsModalVisible, mutation, urlAfterDelete, dataField)}
                >
                    {buttonText}
                </Button>,
            ]}
        >
            <div className={styles.bodyText}>{bodyText}</div>
        </DefaultModal>
    )
}

export default DeleteModal;
