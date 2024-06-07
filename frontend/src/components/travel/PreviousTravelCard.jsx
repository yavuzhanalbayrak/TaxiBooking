import { Card, Col, Row } from "antd";
import React from "react";
import {
  CheckOutlined,
  RightOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./travelStyle.scss";

const historyDetails = {
  title: "props.travelHistory .title",
  date: "props.travelHistory .date",
  time: "props.travelHistory .time",
  status: "completed",
  distance: "props.travelHistory.distance",
  price: 150,
  currency: "TRY",
  phone: "+90 539 202 61 06",
  name: "Yavuzhan Albayrak",
  surname: "Albayrak",
  email: "yavuzalbayrak@gmail.com",
  car: {
    brand: "Honda",
    model: "pcx",
    year: "2021",
  },
  rating: 3,
};

export default function PreviousTravelCard(props) {
  const { t } = useTranslation();
  const [formattedPaymentRate, setFormattedPaymentRate] = React.useState(() => {
    const currency = props.currencyList.find(
      (item) => item.value === historyDetails.currency
    );
    const formattedPaymentRate = `${
      currency.prefix
    } ${props.travelHistory.amount?.toLocaleString(undefined, {
      minimumFractionDigits: currency.decimalDigits,
      maximumFractionDigits: currency.decimalDigits,
    })}`;
    return <p>{formattedPaymentRate}</p>;
  });

  return (
    <div className="prev-card">
      <Card style={{ width: "100%" }}>
        <Row style={{ borderBottom: "1px solid #00000015", width: "100%" }}>
          <div style={{ padding: "24px", width: "100%" }}>
            <Col className="prev-travel-title" span={24}>
              {props.travelHistory.route[0].address.length > 60
                ? props.travelHistory.route[0].address.substring(0, 60) + "..."
                : props.travelHistory.route[0].address}{" "}
              (
              {parseFloat(props.travelHistory.totalDistanceMeters).toFixed(1) +
                " km"}
              )
            </Col>
            <Col className="prev-travel-date" span={24}>
              <span>
                {
                  new Date(props.travelHistory.startTime)
                    .toLocaleString()
                    .split(" ")[0]
                }
              </span>{" "}
              <span className="time">
                {new Date(props.travelHistory.startTime)
                  .toLocaleString()
                  .split(" ")[1]
                  .substring(0, 5)}
              </span>{" "}
            </Col>
            <Row style={{ width: "100%" }}>
              <Col className="prev-travel-price" span={12}>
                <Row gutter={5}>
                  <Col>{t("travelpage.price")}</Col>
                  <Col style={{ color: "#f17624" }}>{formattedPaymentRate}</Col>
                </Row>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <span
                  className="prev-travel-details"
                  onClick={() => {
                    props.setShowDetails(true);
                    props.setDetailInfos({
                      historyDetails,
                    });
                  }}
                >
                  {t("travelpage.details")} <RightOutlined />
                </span>
              </Col>
            </Row>
          </div>
        </Row>
        <Row style={{ padding: "24px" }}>
          <Col span={24}>
            <Row>
              <Col className="prev-travel-status">
                {props.travelHistory.taxibookingStatus == "COMPLETED" ? (
                  <p className="completed">
                    {" "}
                    <CheckOutlined style={{ fontSize: "16px" }} />{" "}
                    {t("travelpage.completed")}{" "}
                  </p>
                ) : (
                  <p className="canceled">
                    {" "}
                    <CloseCircleOutlined style={{ fontSize: "16px" }} />{" "}
                    {t("travelpage.canceled")}{" "}
                  </p>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
