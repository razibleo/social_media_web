import styles from "./signin_form.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import RouteProperty from "../../../utils/routeproperty";
import AuthScreen from "../authscreen";
import SignUpScreen from "../signup/signup_from";
const SignInScreen: React.FC & RouteProperty = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className={styles["wrapper"]}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="fullname"
        rules={[{ required: true, message: "Please enter your Full Name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Or{" "}
        <NavLink to={`/${AuthScreen.routeName}/${SignUpScreen.routeName}`}>
          register now!
        </NavLink>
      </Form.Item>
    </Form>
  );
};
SignInScreen.routeName = "login";

export default SignInScreen;
