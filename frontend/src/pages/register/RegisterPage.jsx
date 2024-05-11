import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../login/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext.jsx";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [mailIsValid, setMailIsValid] = useState(["init"]);
  const [nameIsValid, setNameIsValid] = useState(["init"]);
  const [surnameIsValid, setSurnameIsValid] = useState(["init"]);
  const [passwordIsValid, setPasswordIsValid] = useState(["init"]);
  const [password2IsValid, setPassword2IsValid] = useState(["init"]);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isSurnameFocused, setIsSurnameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPassword2Focused, setIsPassword2Focused] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    setIsLengthValid(password.length >= 8);
    setHasLetter(/[a-zA-Z]/.test(password));
    setHasNumber(/\d/.test(password));
    if (
      password &&
      password == password2 &&
      isLengthValid &&
      hasLetter &&
      hasNumber
    )
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [password, password2]);

  const handleSubmit = async () => {
    setLoading(true);
    if (true) {
      console.log("name: " + name);
      console.log("surname: " + surname);
      console.log("email: " + email);
      console.log("password: " + password);
      console.log("password2: " + password2);
      setTimeout(() => {
        toast.success("Kayıt Başarılı!");
        navigate("/login");
      }, 3000);
    } else {
      setTimeout(() => {
        toast.error("Kayıt Başarısız!");
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <Row>
        <Col style={{ width: "500px" }}>
          <Col className="form-title" span={20}>
            Kaydol
          </Col>
          <Col className="form-description" span={24}>
            Başlamak için lütfen kayıt olun
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

                if (isNameFocused) {
                  const nameErrors = form.getFieldError("name");
                  setNameIsValid(nameErrors);
                }

                if (isSurnameFocused) {
                  const surnameErrors = form.getFieldError("surname");
                  setSurnameIsValid(surnameErrors);
                }

                if (isEmailFocused) {
                  const emailErrors = form.getFieldError("email");
                  setMailIsValid(emailErrors);
                }

                if (isPasswordFocused) {
                  const passwordErrors = form.getFieldError("password");
                  setPasswordIsValid(passwordErrors);
                }

                if (isPassword2Focused) {
                  const password2Errors = form.getFieldError("password2");
                  setPassword2IsValid(password2Errors);
                }
              }}
              autoComplete="off"
            >
              <label className="input-label" htmlFor="">
                İsim
              </label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Lütfen isim giriniz!",
                  },
                ]}
                validateStatus={
                  isNameFocused
                    ? ""
                    : nameIsValid[0] == "init"
                    ? ""
                    : nameIsValid.length == 0
                    ? "success"
                    : "error"
                }
                help={
                  isNameFocused
                    ? ""
                    : nameIsValid[0] == "init"
                    ? ""
                    : nameIsValid
                }
                hasFeedback={!isNameFocused}
              >
                <Input
                  className="input-field"
                  placeholder="İsminizi giriniz"
                  value={email}
                  onFocus={() => {
                    setIsNameFocused(true);
                  }}
                  onBlur={() => {
                    setIsNameFocused(false);
                  }}
                  style={{
                    borderColor: isNameFocused
                      ? "#133163"
                      : nameIsValid
                      ? ""
                      : "#FF4D4F",
                  }}
                  prefix={
                    <UserOutlined
                      style={{
                        color: isNameFocused
                          ? ""
                          : nameIsValid.length === 0
                          ? "green"
                          : "",
                      }}
                    />
                  }
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  disabled={loading}
                />
              </Form.Item>

              <label className="input-label" htmlFor="">
                Soyisim
              </label>
              <Form.Item
                name="surname"
                rules={[
                  {
                    required: true,
                    message: "Lütfen soyadı giriniz!",
                  },
                ]}
                validateStatus={
                  isSurnameFocused
                    ? ""
                    : surnameIsValid[0] == "init"
                    ? ""
                    : surnameIsValid.length == 0
                    ? "success"
                    : "error"
                }
                help={
                  isSurnameFocused
                    ? ""
                    : surnameIsValid[0] == "init"
                    ? ""
                    : surnameIsValid
                }
                hasFeedback={!isSurnameFocused}
              >
                <Input
                  className="input-field"
                  placeholder="Soyisminizi giriniz"
                  value={email}
                  onFocus={() => {
                    setIsSurnameFocused(true);
                  }}
                  onBlur={() => {
                    setIsSurnameFocused(false);
                  }}
                  style={{
                    borderColor: isSurnameFocused
                      ? "#133163"
                      : surnameIsValid
                      ? ""
                      : "#FF4D4F",
                  }}
                  prefix={
                    <UserOutlined
                      style={{
                        color: isSurnameFocused
                          ? ""
                          : surnameIsValid.length === 0
                          ? "green"
                          : "",
                      }}
                    />
                  }
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  disabled={loading}
                />
              </Form.Item>

              <label className="input-label" htmlFor="">
                Mail
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Lütfen uygun e-posta formatı giriniz!",
                  },
                  {
                    required: true,
                    message: "Lütfen e-postanızı giriniz!",
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
                    message: "Lütfen şifrenizi giriniz!",
                  },
                  {
                    min: 8,
                  },
                  {
                    validator: (_, value) => {
                      if (!/[a-zA-Z]/.test(value)) {
                        return Promise.reject(new Error());
                      }
                      return Promise.resolve();
                    },
                  },
                  {
                    validator: (_, value) => {
                      if (!/\d/.test(value)) {
                        return Promise.reject(new Error());
                      }
                      return Promise.resolve();
                    },
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

              <label className="input-label" htmlFor="">
                Şifre Tekrarı
              </label>
              <Form.Item
                name="password2"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Lütfen şifrenizi tekrar girin",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="input-field"
                  placeholder="Şifrenizi tekrar yazınız"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  onFocus={() => setIsPassword2Focused(true)}
                  onBlur={() => setIsPassword2Focused(false)}
                  style={{
                    borderColor: isPassword2Focused
                      ? "#133163"
                      : password2IsValid
                      ? ""
                      : "#FF4D4F",
                  }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  disabled={loading}
                />
              </Form.Item>

              {!password || !(isLengthValid && hasLetter && hasNumber) ? (
                <Col className="password-alert">
                  <Row>
                    <Col span={2}>
                      <ExclamationCircleOutlined className="icon" />{" "}
                    </Col>
                    <Col span={22} className="alert-title">
                      Şifre Kuralları
                    </Col>
                    <Col span={2}></Col>

                    <Col style={{ paddingLeft: "5px" }} span={22}>
                      <p>
                        {!isLengthValid && "En az 8 karakter içermelidir."}{" "}
                      </p>
                      <p>{!hasLetter && "En az bir harf içermelidir."} </p>
                      <p>{!hasNumber && "En az bir rakam içermelidir."}</p>
                    </Col>
                  </Row>
                </Col>
              ) : password === password2 ? null : (
                <Col className="password-success">
                  <Row>
                    <Col span={2}>
                      <CheckCircleOutlined className="icon" />{" "}
                    </Col>
                    <Col span={22} className="alert-title">
                      Şifre Kuralları
                    </Col>
                    <Col span={2}></Col>
                    <Col style={{ paddingLeft: "5px" }} span={22}>
                      Lütfen belirlediğiniz şifreyi tekrar yazın
                    </Col>
                  </Row>
                </Col>
              )}

              <Form.Item wrapperCol={{ span: 24 }}>
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
                  disabled={!formIsValid || loading}
                  loading={loading}
                >
                  {!loading && "Kaydol"}
                </Button>
              </Form.Item>
              <Col className="form-end-message">
                Zaten bir hesabınız var mı?
                <Link
                  to="/login"
                  className="forget-password"
                  href="reset"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                  }}
                >
                  Giriş Yap
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
