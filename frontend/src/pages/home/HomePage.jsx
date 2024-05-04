import React, { useState, useEffect } from "react";
import { Row, Col, Card, Modal, Button } from "antd";
import Map from "../../components/Map";
import LocationInputs from "../../components/LocationInputs";
import LoadingModal from "../../components/loadingModal/LoadingModal";

export default function HomePage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScriptLoaded, setScriptLoaded] = useState(false);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  useEffect(() => {
    function handleResize() {
      setIsPhone(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startSearchForDriver = () => {
    if (destination && source) {
      setIsModalOpen(true);
    }
  };
  return (
    <>
        {isPhone ? (
          //Phone
          <Row gutter={[10, 10]}>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={17}>
              <div className="map">
                <Card bordered={false} style={{ borderRadius: "0px" }}>
                  <div style={{ position: "relative" }}>
                    <Map
                      source={source}
                      destination={destination}
                      setDistance={setDistance}
                      distance={distance}
                      isPhone={true}
                    ></Map>
                  </div>
                  <div className="location-inputs-phone ">
                    <Card
                      className="location-inputs-card-phone"
                      title="Varış Noktası Seçiniz"
                    >
                      <LocationInputs
                        setSource={setSource}
                        setDestination={setDestination}
                        destination={destination}
                        source={source}
                        distance={distance}
                        startSearchForDriver={startSearchForDriver}
                      />
                    </Card>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        ) : (
          <Row style={{ padding: "24px" }} gutter={[10, 10]}>
            <Col span={24} xs={24} sm={24} md={10} lg={10} xl={8} xxl={7}>
              <Col>
                <Card title="Varış Noktası Seçiniz">
                  <LocationInputs
                    setSource={setSource}
                    setDestination={setDestination}
                    destination={destination}
                    source={source}
                    distance={distance}
                    startSearchForDriver={startSearchForDriver}
                  ></LocationInputs>
                </Card>
              </Col>
            </Col>
            <Col span={24} xs={24} sm={24} md={14} lg={14} xl={16} xxl={17}>
              <div className="map">
                <Card title="Harita" bordered={false}>
                  <Map
                    source={source}
                    destination={destination}
                    setDistance={setDistance}
                    distance={distance}
                    isPhone={false}
                  ></Map>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      <LoadingModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      ></LoadingModal>
    </>
  );
}
