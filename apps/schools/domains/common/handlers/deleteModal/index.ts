import { message } from "antd";
import { successDeleteMsg } from "@domains/common/constants/deleteModal";

export async function handleDeleteButtonClick (setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>, mutation: any, urlAfterDelete: string, dataField: string) {
  const { pathname } = window.location;
  const mutationData = { [dataField]: pathname.split('/').at(-1) };
  let response = await mutation(mutationData)

  if (!('error' in response)) {
    setIsModalVisible(false)
    message.success(successDeleteMsg)
    window.location.href = urlAfterDelete
  }
}
