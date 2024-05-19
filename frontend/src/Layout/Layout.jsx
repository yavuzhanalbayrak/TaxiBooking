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
import { UserOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import GlobalContext from "../context/GlobalContext";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;

const App = ({ children, link, icon }) => {
  const signOut = useSignOut();
  const { selectedKeys, isPhone, setIsPhone, height, setHeight } =
    React.useContext(GlobalContext);
  const auth = useAuthUser();
  const { t } = useTranslation();


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
          <UserOutlined style={{ fontSize: "15px" }} />
          <span style={{ marginLeft: "3px" }}>{t("layout.profile")}</span>
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
          <Row>
            <Col style={{ paddingTop: "4px" }}>
              <LogoutOutlinedIcon style={{ fontSize: "16px" }} />
            </Col>
            <Col style={{ marginLeft: "3px" }}> {t("layout.logout")} </Col>
          </Row>
        </Link>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: <Link to="/">
        {t("layout.map")}
      </Link>,
    },
    {
      key: "2",
      label: <Link to="/Travel">
        {t("layout.travel")}
      </Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerPadding: isPhone ? "0px 15px" : "0px 60px",
          },
        },
      }}
    >
      <Layout>
        <Header
          className="navbar"
          style={{
            backgroundColor: "#00305f",
            boxShadow:
              isPhone &&
              selectedKeys == 1 &&
              "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Row style={{ width: "100%" }}>
            <Col span={20}>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={items}
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderColor: "#0000002f",
                  backgroundColor: "#00305f",
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
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#1677ff",
                    fontSize: "22px",
                    fontWeight: "bold", // Bold font weight
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Shadow for depth
                    touchAction: "manipulation", // Prevent default mobile browser highlighting
                    WebkitTapHighlightColor: "transparent",
                    height: "35px",
                    width: "35px",
                  }}
                  icon={auth.name.substring(0, 1).toUpperCase()}
                />
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content>
          <div
            style={{
              height: isPhone && `calc(${height}px - 64px)`,
              minHeight: !isPhone && `calc(${height}px - 64px)`,
              background: colorBgContainer,
              borderRadius: 0,
              backgroundColor: "#00000011",
              overflowY: "hidden",
              overflowX: "hidden",
              padding: !isPhone && "32px 60px",
            }}
          >
            {children}
          </div>
        </Content>
        {!isPhone && (
          <Footer
            style={{
              textAlign: "center",
              zIndex: "200",
              backgroundColor: "#00305f",
              color:"#ffffff"
            }}
          >
            Taxi Booking ©{new Date().getFullYear()}
          </Footer>
        )}
      </Layout>
    </ConfigProvider>
  );
};
export default App;
