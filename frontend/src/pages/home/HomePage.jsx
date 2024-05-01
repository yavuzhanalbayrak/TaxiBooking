import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Dropdown, Card } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";

import Map from "../../components/Map";
import LocationInputs from "../../components/LocationInputs";
import DriverCard from "../../components/driverCard/DriverCard";

const drivers = [
  {
    driverName: "Şimşek McQueen",
    pricePerKM: "100",
    brand: "Şimşek",
    model: "McQueen",
    year: "2004",
    carUrl: null,
    point:parseInt(4.3),
  },
  {
    driverName: "Chick Hicks",
    pricePerKM: "259",
    brand: "Şimşek",
    model: "McQueen",
    year: "2024",
    carUrl: null,
    point:parseInt(3.8),
  },
];

export default function HomePage() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [distance, setDistance] = useState([]);
  const [search, setSearch] = useState(false);

  return (
    <Row gutter={[10, 10]}>
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey={import.meta.env.VITE_MAP_API}
      >
        <Col span={24} xs={24} sm={24} md={10} lg={10} xl={7} xxl={7}>
          <Col>
            <LocationInputs
              setSource={setSource}
              setDestination={setDestination}
              distance={distance}
              setSearch={setSearch}
            ></LocationInputs>
          </Col>
          {search && (
            <Col>
              <div className="drivers">
                <Card title="Araçlar" bordered={false}>
                  {drivers.map((driver, index) => {
                    return <DriverCard driver={driver} key={index} />;
                  })}
                </Card>
              </div>
            </Col>
          )}
        </Col>
        <Col span={24} xs={24} sm={24} md={14} lg={14} xl={17} xxl={17}>
          <Map
            source={source}
            destination={destination}
            setDistance={setDistance}
          ></Map>
        </Col>
      </LoadScript>
    </Row>
  );
}
