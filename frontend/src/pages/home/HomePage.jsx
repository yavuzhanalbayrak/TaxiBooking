import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Dropdown } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Map from "../../components/Map";
import LocationInputs from "../../components/LocationInputs";

export default function HomePage() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  //const {destination, setDestination, source, setSource} = useContext(GlobalContext);


  return (
    <Row gutter={[10,10]}>
      <Col span={24} xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
        <LocationInputs source={source} setSource={setSource}></LocationInputs>
      </Col>
      <Col span={24} xs={24} sm={24} md={17} lg={17} xl={17} xxl={17}>
        <Map></Map>
      </Col>
    </Row>
  );
}
