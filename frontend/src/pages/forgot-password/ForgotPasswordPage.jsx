import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Alert, Space } from "antd";
import AuthLayout from "../../Layout/AuthLayout.jsx";
import { toast } from "react-toastify";

function ResetPassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [mailIsValid, setMailIsValid] = useState(["init"]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const { token, setToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      (async () => {
        try {
          await axios
            .post(`${import.meta.env.VITE_API_PORT}/api/email/${email}`, {
              email,
            })
            .then((result) => {
              toast.success("Email Gönderildi!");
              navigate("/login");
              setErrorMessage("");
              setLoading(false);
            })
            .catch(() => {
              toast.error("Email Gönderilemedi!");
              setLoading(false);
            });
        } catch (error) {
          console.error("Login failed:", error.response.data);
          setErrorMessage(error.response.data);
          setLoading(false);
        }
      })();
    }
  }, [loading]);
  return (
    <Row>
      <Col style={{ width: "500px" }}>
        <Col className="form-title">Şifre Yenile</Col>
        <Col className="form-description" span={24}>
          Şifrenizi sıfırlamak için kayıtlı e-posta adresinizi yazınız.
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

              const emailErrors = form.getFieldError("email");
              setMailIsValid(emailErrors);
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
                isFocused
                  ? ""
                  : mailIsValid[0] == "init"
                  ? ""
                  : mailIsValid.length == 0
                  ? "success"
                  : "error"
              }
              help={
                isFocused ? "" : mailIsValid[0] == "init" ? "" : mailIsValid
              }
              hasFeedback={!isFocused}
            >
              <Input
                className="input-field"
                placeholder="Mail adresinizi yazınız"
                value={email}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: isFocused
                    ? "#133163"
                    : mailIsValid
                    ? ""
                    : "#FF4D4F",
                }}
                prefix={
                  <MailOutlined
                    style={{
                      color: isFocused
                        ? ""
                        : mailIsValid.length === 0
                        ? "green"
                        : "",
                    }}
                  />
                }
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                disabled={loading} // Disable the input when loading
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button
                className="submit"
                style={{
                  width: "100%",
                  color: formIsValid ? "white" : "#00000040",
                  backgroundColor: formIsValid ? "black" : "#0000000A",
                  border: formIsValid ? "#0057D9" : "1px solid #00000026",
                }}
                type="primary"
                htmlType="submit"
                disabled={!formIsValid || loading} // Disable the button when loading
                loading={loading} // Show loading spinner
              >
                {!loading && " İlerle"}
              </Button>
            </Form.Item>
            <Form.Item>
              <Row justify="center">
                <Button
                  type="link"
                  href="login"
                  style={{
                    color: loading ? "#00000040" : "black",
                  }}
                  primaryColor="Black"
                  textHoverBg="black"
                  disabled={loading}
                >
                  Giriş Sayfasına Geri Dön
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Col>
    </Row>
  );
}

export default ResetPassword;
