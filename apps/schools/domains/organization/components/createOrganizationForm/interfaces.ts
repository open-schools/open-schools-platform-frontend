import { ModalProps } from "antd";

export interface CustomCreateOrganizationFormProps extends ModalProps {
    isModalVisible: boolean,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    organizationCookieChange: (value: string) => void,
}
