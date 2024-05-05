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
  ConfigProvider,
} from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import GlobalContext from "../context/GlobalContext";

const { Header, Content, Footer } = Layout;

const App = ({ children, link, icon }) => {
  const signOut = useSignOut();
  const {selectedKeys, isPhone, setIsPhone, height, setHeight} = React.useContext(GlobalContext);

  React.useEffect(() => {
    function handleResize() {
      setIsPhone(window.innerWidth <= 768);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const profileItems = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          Profil
        </Link>
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
            window.location.reload();
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
      label: <Link to="/">Araç Bul</Link>,
    },
    {
      key: "2",
      label: <Link to="/Travel">Yolculuk</Link>,
    },
  ];

  return (
    <ConfigProvider
  theme={{
    components: {
      Layout: {
        headerPadding:isPhone?"0px 15px":"0px 60px"
      },
    },
  }}
>
    <Layout>
      <Header
      className="navbar"
      >
        <Row style={{ width: "100%"}}>
          <Col span={20}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
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
      <Content >
        <div
          style={{
            height: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: 0,
            backgroundColor: "#00000011",
            overflowY:"hidden",
            overflowX:"hidden"
          }}
        >
          {children}
        </div>
      </Content>
      {!isPhone&&<Footer
        style={{
          textAlign: "center",
          zIndex:"200"
        }}
      >
        Taxi Booking ©{new Date().getFullYear()}
      </Footer>}
    </Layout>
    </ConfigProvider>
  );
};
export default App;
