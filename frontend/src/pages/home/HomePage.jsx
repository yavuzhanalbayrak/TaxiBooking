import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Modal, Button } from "antd";
import Map from "../../components/map/Map";
import LocationInputs from "../../components/LocationInputs";
import LoadingModal from "../../components/loadingModal/LoadingModal";
import { useJsApiLoader } from "@react-google-maps/api";
import { LoadingOutlined } from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";

export default function HomePage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {setSelectedKeys, isPhone} = useContext(GlobalContext);

  useEffect(() => {
    setSelectedKeys(["1"]);
  }, []);

  const startSearchForDriver = () => {
    if (destination && source) {
      setIsModalOpen(true);
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAP_API,
    libraries: ["places"],
  });

  return (
    <>
      {isLoaded ? (
        <div>
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
                          isPhone={true}
                        />
                      </Card>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          ) : (
            <Row style={{ padding: "24px 60px" }} gutter={[10, 10]}>
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
                      isPhone={false}
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
        </div>
      ):(<div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          height: "100vh",
          alignContent: "center",
        }}
      >
        <p>Harita Yükleniyor</p> <LoadingOutlined></LoadingOutlined>
      </div>)}

      <LoadingModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      ></LoadingModal>
    </>
  );
}
