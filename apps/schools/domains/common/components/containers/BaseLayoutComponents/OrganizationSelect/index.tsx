import React, { useState } from 'react'
import { Button, Modal, Select, SelectProps } from 'antd'
import styles from './styles/styles.module.scss'
import { useGetAllOrganizationsQuery } from '../../../../../organization/redux/organizationApi'
import { useOrganization } from 'domains/user/providers/organizationProvider'

const { Option } = Select

export default function OrganizationSelect () {
    const { isLoading, data } = useGetAllOrganizationsQuery({})
    const { organization, setOrganizationId } = useOrganization()

    const [isModalVisible, setIsModalVisible] = useState(false)

    const ORGANIZATION_SELECT_SHOW_ACTIONS: SelectProps<string>["showAction"] =
        ['focus', 'click']

    const organizationCookieChange = (value: string) => {
        setOrganizationId(value)
        window.location.reload()
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    return (
        <div className={styles.container}>
            <Select
                className={styles.select}
                loading={isLoading}
                size={'middle'}
                showSearch
                listHeight={150}
                optionFilterProp="children"
                showAction={ORGANIZATION_SELECT_SHOW_ACTIONS}
                autoFocus={true}
                dropdownStyle={{ borderRadius: '8px' }}
                dropdownRender={(menu) => (
                    <div className={styles.dropdown}>
                        {menu}
                        <Button type="default" onClick={showModal} className={styles.addButton}>
                            Создать организацию
                        </Button>
                    </div>
                )}
                onChange={organizationCookieChange}
                value={organization.name ? organization.name : 'Создать организацию'}
            >
                {data?.results.map((organization) => (
                    <Option
                        className={styles.option}
                        data-cy={'organization-select-item'}
                        key={organization.id}
                        value={organization.id}
                        title={organization.name}
                    >
                        {organization.name}
                    </Option>
                ))}
                <Option style={{ display: 'none' }}>
                    Empty
                </Option>
            </Select>
            <Modal className={styles.modal}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                {/*<CreateOrganization modalVisible={setIsModalVisible} />*/}
            </Modal>
        </div>
    )
}