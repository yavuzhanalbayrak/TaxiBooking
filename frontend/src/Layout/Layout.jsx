import React from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Row,
  Col,
  Avatar,
  Dropdown,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const { Header, Content, Footer } = Layout;

const App = ({ children, link, icon }) => {
  const signOut = useSignOut();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const profileItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Profil
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/login"
          style={{ textDecoration: "none" }}
          onClick={() => {
            signOut();
          }}
          color="inherit"
        >
          Çıkış Yap
        </Link>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderBottom: `1px solid #0000002f`,
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col span={20}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items}
              style={{
                flex: 1,
                minWidth: 0,
                borderColor: "#0000002f",
              }}
            />
          </Col>
          <Col style={{ textAlign: "end" }} span={4}>
            <Dropdown
              menu={{
                items: profileItems,
              }}
              placement="bottomRight"
            >
              <Avatar
                style={{ cursor: "pointer" }}
                size="large"
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
        }}
      >

        <div
          style={{
            padding: 24,
            minHeight: "calc(100vh)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Taxi Booking ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
export default App;
