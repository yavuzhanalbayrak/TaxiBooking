import React from 'react'
import GlobalContext from '../../context/GlobalContext';
import { Col, Row } from 'antd';
import Stripe from "../../api/Stripe"

export default function TravelPage() {
    const {setSelectedKeys, isPhone} = React.useContext(GlobalContext);

    React.useEffect(() => {
      setSelectedKeys(["2"]);
    }, []);

  return (
    <div>TravelPage
        <Row>
            <Col>
                <Stripe></Stripe>
            </Col>
        </Row>
    </div>
  )
}
