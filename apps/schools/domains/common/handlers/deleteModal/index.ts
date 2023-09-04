import { message } from 'antd'
import { successDeleteMsg } from '@domains/common/constants/deleteModal'
import { getUuid } from '@domains/common/utils/getUuid'

export async function handleDeleteButtonClick(
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    mutation: any,
    urlAfterDelete: string,
    dataField: string,
) {
    const uuid = getUuid()

    if (uuid === null) return
    const mutationData = { [dataField]: uuid[0] }
    let response = await mutation(mutationData)

    if (!('error' in response)) {
        setIsModalVisible(false)
        message.success(successDeleteMsg)
        window.location.href = urlAfterDelete
    }
}
