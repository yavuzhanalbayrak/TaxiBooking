import React, { useState } from "react";
import { Button, Modal } from "antd";

const App = ({
  title,
  description,
  onOkModal,
  isModalOpen,
  setIsModalOpen,
  loading,
  t
}) => {

  return (
    <>
      <Modal
        title={title}
        visible={isModalOpen}
        okText="Evet"
        okType="primary"
        cancelText="Hayır"
        confirmLoading
        onCancel={() => {
          setIsModalOpen(false);
        }}
        closeIcon={false}
        footer={(props) => (
          <div>
            <div>
              <Button
                style={{ marginRight: "5px" }}
                type="primary"
                danger
                onClick={() => setIsModalOpen(false)}
              >
                {t("travelpage.no")}
              </Button>
              <Button
                onClick={() => {
                  onOkModal()
                }}
                type="primary"
                loading={loading}
                disabled={loading}
              >
                {t("travelpage.yes")}
              </Button>
            </div>
          </div>
        )}
      >
        <p>{description}</p>
      </Modal>
    </>
  );
};
export default App;
