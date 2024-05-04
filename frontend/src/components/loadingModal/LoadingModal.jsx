import React from 'react'
import { Modal, Row, Col, Button } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";

export default function LoadingModal({isModalOpen, setIsModalOpen }) {
  return (
    <div>
        <Modal
        title="Sürücü Aranıyor"
        open={isModalOpen}
        closeIcon={false}
        footer={false}
        style={{ paddingTop: "25vh" }}
      >
        <Row
          gutter={[0, 25]}
          style={{ textAlign: "center", paddingTop: "10px" }}
        >
          <Col span={24}>
            Lütfen Bekleyiniz
            <Col span={24} style={{paddingTop:"10px"}}>
              <LoadingOutlined style={{ fontSize: "24px" }} />
            </Col>
          </Col>

          <Col span={24}>
            <Button
              onClick={() => setIsModalOpen(false)}
              style={{ width: "30%" }}
              danger
              type="primary"
            >
              İptal
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
