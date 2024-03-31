import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Login.scss";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Space } from "antd";
import GlobalContext from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function Login() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [mailIsValid, setMailIsValid] = useState(["init"]);
  const [passwordIsValid, setPasswordIsValid] = useState(["init"]);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const signIn = useSignIn();

  const handleSubmit = async () => {
    setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_API_PORT}/api/users/login`, {
          email,
          password,
        })
        .then((result) => {
          if (
            signIn({
              auth: {
                token: result.data.accessToken,
                type: "Bearer",
              },
              userState: {
                name: "React User",
                uid: 123456,
              },
            })
          ) {
            navigate("/");
            localStorage.setItem("token", result.data.accessToken);
          } else {
            toast.error("Kullanıcı Bilgileri Hatalı!");

          }
        })
        .catch((error) => {
            toast.error("Kullanıcı Bilgileri Hatalı!");
            setLoading(false);
         })

  
  };

  return (
    <>
      <Row>
        <Col>
          <Col className="form-title" span={20}>
            Giriş
          </Col>
          <Col className="form-description" span={24}>
            Başlamak için lütfen giriş yapın
          </Col>
          <Col>
            <Form
              form={form}
              onSubmitCapture={handleSubmit}
              name="basic"
              labelCol={{
                span: 24,
              }}
              onFinishFailed={() => {}}
              onValuesChange={async (_, allFields) => {
                try {
                  await form.validateFields();
                  setErrorMessage("");
                } catch (error) {
                  setErrorMessage(error.message);
                }
                const errors = form.getFieldsError();
                const isValid = errors.every(({ errors }) => !errors.length);
                setFormIsValid(isValid);

                if (isEmailFocused) {
                  const emailErrors = form.getFieldError("email");
                  setMailIsValid(emailErrors);
                }

                if (isPasswordFocused) {
                  const passwordErrors = form.getFieldError("password");
                  setPasswordIsValid(passwordErrors);
                }
              }}
              autoComplete="off"
            >
              <label className="input-label" htmlFor="">
                Mail
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                validateStatus={
                  isEmailFocused
                    ? ""
                    : mailIsValid[0] == "init"
                    ? ""
                    : mailIsValid.length == 0
                    ? "success"
                    : "error"
                }
                help={
                  isEmailFocused
                    ? ""
                    : mailIsValid[0] == "init"
                    ? ""
                    : mailIsValid
                }
                hasFeedback={!isEmailFocused}
              >
                <Input
                  className="input-field"
                  placeholder="Mail adresinizi yazınız"
                  value={email}
                  onFocus={() => {
                    setIsEmailFocused(true);
                  }}
                  onBlur={() => {
                    setIsEmailFocused(false);
                  }}
                  style={{
                    borderColor: isEmailFocused
                      ? "#133163"
                      : mailIsValid
                      ? ""
                      : "#FF4D4F",
                    maxWidth: "235px",
                  }}
                  prefix={
                    <MailOutlined
                      style={{
                        color: isEmailFocused
                          ? ""
                          : mailIsValid.length === 0
                          ? "green"
                          : "",
                      }}
                    />
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  disabled={loading}
                />
              </Form.Item>
              <label className="input-label" htmlFor="">
                Şifre
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                validateStatus={
                  isPasswordFocused
                    ? ""
                    : passwordIsValid[0] == "init"
                    ? ""
                    : passwordIsValid.length == 0
                    ? "success"
                    : "error"
                }
                help={
                  isPasswordFocused
                    ? ""
                    : passwordIsValid[0] == "init"
                    ? ""
                    : passwordIsValid
                }
                hasFeedback={!isPasswordFocused}
              >
                <Input.Password
                  className="input-field"
                  placeholder="Şifrenizi yazınız"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  style={{
                    borderColor: isPasswordFocused
                      ? "#133163"
                      : passwordIsValid
                      ? ""
                      : "#FF4D4F",
                    maxWidth: "235px",
                  }}
                  prefix={
                    <LockOutlined
                      className="site-form-item-icon"
                      style={{
                        color: isPasswordFocused
                          ? ""
                          : passwordIsValid.length == 0
                          ? "green"
                          : "",
                      }}
                    />
                  }
                  disabled={loading}
                />
              </Form.Item>

              <Row
                style={{
                  marginTop: "-15px",
                }}
              >
                <Col span={12}>
                  <Form.Item>
                    <Checkbox
                      className="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    >
                      Beni hatırla
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col align="end" span={12}>
                  <Form.Item>
                    <Button
                      className="forget-password"
                      type="link"
                      href="forgotPassword"
                      style={{
                        color: "black",
                      }}
                    >
                      Şifremi Unuttum
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  className="submit"
                  style={{
                    width: "100%",
                    color: formIsValid ? "white" : "#00000040",
                    backgroundColor: formIsValid ? "black" : "#0000000A",
                    border: formIsValid ? "#0057D9" : "1px solid #00000026",
                    maxWidth: "235px",
                  }}
                  type="primary"
                  htmlType="submit"
                  disabled={!formIsValid || loading}
                  loading={loading}
                >
                  {!loading && "Giriş Yap"}
                </Button>
              </Form.Item>
              <Col className="form-end-message">
                Hesabınız yok mu?
                <Link
                  to="/register"
                  className="forget-password"
                  href="reset"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                  }}
                >
                  Kaydol
                </Link>
              </Col>
            </Form>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default Login;
