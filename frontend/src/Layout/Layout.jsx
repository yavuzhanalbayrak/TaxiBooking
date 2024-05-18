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

const { Header, Content, Footer } = Layout;

const App = ({ children, link, icon }) => {
  const signOut = useSignOut();
  const { selectedKeys, isPhone, setIsPhone, height, setHeight } =
    React.useContext(GlobalContext);
  const auth = useAuthUser();

  console.log(auth.name.substring(0, 2).toUpperCase());

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
          <span style={{ marginLeft: "3px" }}>Profil</span>
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
            <Col style={{ marginLeft: "3px" }}>Çıkış Yap</Col>
          </Row>
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
            headerPadding: isPhone ? "0px 15px" : "0px 60px",
          },
        },
      }}
    >
      <Layout>
        <Header
          className="navbar"
          style={{
            backgroundColor: "#00007f",
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
                  backgroundColor: "#00007f",
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
                    backgroundColor: "#2060ff",
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
