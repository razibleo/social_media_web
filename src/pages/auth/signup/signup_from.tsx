import React, { useReducer } from "react";
import styles from "./signup_form.module.scss";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import RouteProperty from "../../../utils/routeproperty";
import { NavLink } from "react-router-dom";
import AuthScreen from "../authscreen";
import SignInScreen from "../signin/signin_from";
import * as yup from "yup";
import parseYupError from "../../../utils/yupErrorParser";
import { CustomReducer } from "../../../utils/helpers";
import Fade from "../../../shared/components/transitions/fade";
import AuthApi from "../../../apis/authapi";
import CustomResponse from "../../../utils/customresponse";
import FutureStatus from "../../../utils/FutureStatus";

const registerSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Please enter your full name")
    .trim()
    .min(2, "name is too short"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email")
    .trim(),
  password: yup
    .string()
    .required("Please enter your password")
    .trim()
    .min(8, "Password is too short"),
  confirm_password: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type RegistrationData = yup.InferType<typeof registerSchema>;

interface MyState {
  formErrors: Map<string, string[]>;
  customResponse: CustomResponse<void>;
}
const initialState: MyState = {
  formErrors: new Map(),
  customResponse: { status: FutureStatus.initialized },
};

const SignUpScreen: React.FC & RouteProperty = () => {
  const [state, dispatch] = useReducer<
    CustomReducer<MyState, Partial<MyState>>
  >((previousState, newData) => {
    return {
      ...previousState,
      ...newData,
    };
  }, initialState);

  const onFinish = async (values: unknown) => {
    if (state.customResponse.status == FutureStatus.loading) return;
    dispatch({
      ...initialState,
      customResponse: { status: FutureStatus.loading },
    });
    try {
      const registrationData: RegistrationData = registerSchema.validateSync(
        values,
        {
          abortEarly: false,
          strict: true,
        }
      );

      const user = await AuthApi.registerUser(
        registrationData.email,
        registrationData.password,
        registrationData.fullname
      );

      dispatch({
        customResponse: { status: FutureStatus.success },
      });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        console.log(parseYupError(e));

        dispatch({
          formErrors: parseYupError(e),
          customResponse: { status: FutureStatus.initialized },
        });
      } else {
        dispatch({
          customResponse: {
            status: FutureStatus.failure,
            error: e instanceof Error ? e : new Error("Something went wrong!"),
          },
        });

        // setFormErrors({
        //   unknown: [
        //     "Oops! Something went wrong. Please try again later.",
        //   ],
        // });
      }
      // hasError = true;
    }
  };

  const fullNameError = state.formErrors.get("fullname");
  const emailError = state.formErrors.get("email");
  const passwordError = state.formErrors.get("password");
  const confirmPasswordError = state.formErrors.get("confirm_password");

  return (
    <Form
      name="normal_login"
      className={styles["wrapper"]}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item className={styles["formitem"]}>
        <Form.Item name="fullname" className={styles["formitem"]}>
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>
        <Fade duration={400} isVisible={fullNameError != null}>
          {" "}
          <p className={styles["error-message"]}>
            {fullNameError != null ? fullNameError[0] : null}
          </p>
        </Fade>
      </Form.Item>

      <Form.Item className={styles["formitem"]}>
        <Form.Item name="email" className={styles["formitem"]}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Fade duration={400} isVisible={emailError != null}>
          {" "}
          <p className={styles["error-message"]}>
            {emailError != null ? emailError[0] : null}
          </p>
        </Fade>
      </Form.Item>

      <Form.Item className={styles["formitem"]}>
        <Form.Item name="password" className={styles["formitem"]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Fade duration={400} isVisible={passwordError != null}>
          {" "}
          <p className={styles["error-message"]}>
            {passwordError != null ? passwordError[0] : null}
          </p>
        </Fade>
      </Form.Item>

      <Form.Item className={styles["formitem"]}>
        <Form.Item name="confirm_password" className={styles["formitem"]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Fade duration={400} isVisible={confirmPasswordError != null}>
          {" "}
          <p className={styles["error-message"]}>
            {confirmPasswordError != null ? confirmPasswordError[0] : null}
          </p>
        </Fade>
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

      {state.customResponse.status == FutureStatus.loading && (
        <Spin size="large" />
      )}

      <Fade duration={400} isVisible={state.customResponse.error != null}>
        {" "}
        <p className={styles["respone-error-message"]}>
          {state.customResponse.error?.message}
        </p>
      </Fade>
    </Form>
  );
};
SignUpScreen.routeName = "register";

export default SignUpScreen;
