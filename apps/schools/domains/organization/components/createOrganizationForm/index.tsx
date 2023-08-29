import React from 'react'
import { Col, Form, Modal } from 'antd'
import styles from './styles/styles.module.scss'
import { handleSubmitCreateOrganizationForm } from '@domains/organization/handlers/organization'
import { Input } from '@domains/common/components/input'
import { useCreateOrganizationFormValidators } from '@domains/organization/components/createOrganizationForm/hooks'
import { useCreateOrganizationMutation } from '@domains/organization/redux/organizationApi'
import { CustomCreateOrganizationFormProps } from '@domains/organization/components/createOrganizationForm/interfaces'
import { DISPLAY_NONE, OK_BUTTON_STYLE } from "@domains/organization/components/createOrganizationForm/styles/styles";

const CreateOrganizationForm: React.FC<CustomCreateOrganizationFormProps> = (props) => {
    const { isModalVisible, setIsModalVisible, organizationCookieChange, children, ...restProps } = props

    const validators = useCreateOrganizationFormValidators()
    const [form] = Form.useForm()

    const [mutation] = useCreateOrganizationMutation()

    return (
        <Modal
            open={isModalVisible}
            className={styles.modal}
            title='Создание организации'
            okText={'Добавить'}
            cancelButtonProps={{ style: DISPLAY_NONE }}
            okButtonProps={{ style: OK_BUTTON_STYLE }}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => {
                form.validateFields().then(() => {
                    try {
                        organizationCookieChange(String(handleSubmitCreateOrganizationForm(form, mutation)))
                        setIsModalVisible(false)
                        form.resetFields()
                    } catch (error: any) {
                        console.error(error)
                    }
                })
            }}
        >
            <Form form={form} preserve={false} layout='vertical'>
                <Form.Item className={styles.label}>Для создания организации введите основные данные</Form.Item>
                <Col span={24}>
                    <Form.Item rules={validators.name} name='name' label={'Название'} className={styles.label}>
                        <Input placeholder={'Например, ООО «МБОУ СОШ №1»'} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className={styles.label} name='inn' label={'ИНН'} rules={validators.INN}>
                        <Input />
                    </Form.Item>
                </Col>
            </Form>
        </Modal>
    )
}

export default CreateOrganizationForm
