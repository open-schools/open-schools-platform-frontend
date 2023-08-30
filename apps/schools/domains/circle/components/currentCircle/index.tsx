import React, { useState } from "react";
import DeleteModal from "@domains/common/components/deleteModal";
import { Button } from "@domains/common/components/button";
import { useDeleteCircleMutation } from "@domains/circle/redux/circleApi";

const CurrentCircle = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [mutation] = useDeleteCircleMutation()

  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}>
        Удалить кружок
      </Button>

      <DeleteModal
        isModalVisible={isModalVisible}
        mutation={mutation}
        setIsModalVisible={setIsModalVisible}
        titleText={'Удалить кружок?'}
        buttonText={'Удалить кружок'}
        urlAfterDelete={'/circle'}
        dataField={'circle_id'}
      />
    </div>
  );
};

export default CurrentCircle;
