import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Dropdown } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function HomePage() {
  const [startPoint, setStartPoint] = useState(null);
  const [destPoint, setDestPoint] = useState(null);
  const onSearch = () => {
    console.log("search");
  };
  return (
    <Row>
      <Col span={7}>
        <Row style={{ marginBottom: "5px" }}>
          <Col span={24}>
            <h2>Taksi</h2>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_MAP_API}
              selectProps={{
                placeholder: "Başlangıç adresinizi giriniz",
                destPoint,
                onChange: setDestPoint,
                isClearable: true,
                components: {
                  DropdownIndicator: false,
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                },
              }}
            />{" "}
          </Col>
          <Col span={24}>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_MAP_API}
              selectProps={{
                placeholder: "Varış adresinizi giriniz",
                startPoint,
                onChange: setStartPoint,
                isClearable: true,
                components: {
                  DropdownIndicator: false,
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                },
              }}
            />{" "}
          </Col>
          <Col span={24}>
            <Button
              style={{ width: "100%", marginTop: "5px" }}
              onClick={() => onSearch()}
            >
              Ara
            </Button>
          </Col>
        </Row>
      </Col>
      <div></div>
    </Row>
  );
}
