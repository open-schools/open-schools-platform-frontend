import { ModalProps } from 'antd'

export interface CustomModalProps extends ModalProps {
    isModalVisible: boolean
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    mutation: any
    dataField: string
    bodyText?: string
    titleText: string
    buttonText: string
    urlAfterDelete: string
}
