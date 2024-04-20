import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Dropdown } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";

import Map from "../../components/Map";
import LocationInputs from "../../components/LocationInputs";

export default function HomePage() {
  return (
    <Row gutter={[10, 10]}>
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey={import.meta.env.VITE_MAP_API}
      >
        <Col span={24} xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
          <LocationInputs></LocationInputs>
        </Col>
        <Col span={24} xs={24} sm={24} md={17} lg={17} xl={17} xxl={17}>
          <Map></Map>
        </Col>
      </LoadScript>
    </Row>
  );
}
