import styles from "./signin_form.module.scss";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import RouteProperty from "../../../utils/routeproperty";
import AuthScreen from "../authscreen";
import SignUpScreen from "../signup/signup_from";
import * as yup from "yup";
import FutureStatus from "../../../utils/FutureStatus";
import Fade from "../../../shared/components/transitions/fade";
import { useContext, useReducer } from "react";
import { CustomReducer } from "../../../utils/helpers";
import parseYupError from "../../../utils/yupErrorParser";
import CustomResponse from "../../../utils/customresponse";
import { AuthContext } from "../../../providers/authprovider";
import ProfileScreen from "../../profile/profilescreen";

const registerSchema = yup.object().shape({
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
});

type LoginData = yup.InferType<typeof registerSchema>;
interface MyState {
  formErrors: Map<string, string[]>;
  customResponse: CustomResponse<void>;
}
const initialState: MyState = {
  formErrors: new Map(),
  customResponse: { status: FutureStatus.initialized },
};
const SignInScreen: React.FC & RouteProperty = () => {
  const authState = useContext(AuthContext);
  const navigate = useNavigate();

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
      const registrationData: LoginData = registerSchema.validateSync(values, {
        abortEarly: false,
        strict: true,
      });

      await authState.login(registrationData.email, registrationData.password);
      navigate(`/user/${ProfileScreen.routeName}`);

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

  const emailError = state.formErrors.get("email");
  const passwordError = state.formErrors.get("password");

  return (
    <Form
      name="normal_login"
      className={styles["wrapper"]}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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
          Login
        </Button>
        Or{" "}
        <NavLink to={`/${AuthScreen.routeName}/${SignUpScreen.routeName}`}>
          register now!
        </NavLink>
      </Form.Item>

      <Button
        type="primary"
        className="login-form-button"
        onClick={async () => {
          await authState.signinWithGoogle();
          navigate(`/user/${ProfileScreen.routeName}`);
        }}
      >
        Sign in with Google
      </Button>

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
SignInScreen.routeName = "login";

export default SignInScreen;
