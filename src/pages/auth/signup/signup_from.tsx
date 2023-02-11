import React from "react";
import styles from "./signup_form.module.scss";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import RouteProperty from "../../../utils/routeproperty";
import { NavLink, useLocation } from "react-router-dom";
import AuthScreen from "../authscreen";
import SignInScreen from "../signin/signin_from";

const SignUpScreen: React.FC & RouteProperty = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const location = useLocation();

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
        name="email"
        rules={[{ required: true, message: "Please enter your Username!" }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
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
          Log in
        </Button>
        Already have an account?{" "}
        <NavLink to={`/${AuthScreen.routeName}/${SignInScreen.routeName}`}>
          Sign in
        </NavLink>
      </Form.Item>
    </Form>
  );
};
SignUpScreen.routeName = "register";

export default SignUpScreen;
