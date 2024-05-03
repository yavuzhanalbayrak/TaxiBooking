import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { LoadScript } from "@react-google-maps/api";
import Map from "../../components/Map";
import LocationInputs from "../../components/LocationInputs";

export default function HomePage() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [distance, setDistance] = useState([]);
  const [search, setSearch] = useState(false);
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsPhone(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey={import.meta.env.VITE_MAP_API}
      >
        {isPhone ? (
          //Phone
          <Row gutter={[10, 10]}>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={17}>
              <div className="map">
                <Card bordered={false} style={{ borderRadius: "0px" }}>
                  <div style={{ position: "relative" }}>
                    {/* <div className="shadow-top"></div> */}
                    <Map
                      source={source}
                      destination={destination}
                      setDistance={setDistance}
                      distance={distance}
                      isPhone={true}
                    ></Map>
                    {/* <div className="shadow-bottom"></div> */}
                  </div>
                  <div
                    className="location-inputs-phone "
                  >
                    <Card
                      style={{ borderRadius: "0px" }}
                      title="Varış Noktası Seçiniz"
                    >
                      <LocationInputs
                        setSource={setSource}
                        setDestination={setDestination}
                        distance={distance}
                        setSearch={setSearch}
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
                    distance={distance}
                    setSearch={setSearch}
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
      </LoadScript>
    </>
  );
}
