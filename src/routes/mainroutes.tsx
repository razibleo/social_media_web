import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUpScreen from "../pages/auth/signup/signup_from";
import AuthScreen from "../pages/auth/authscreen";
import SignInScreen from "../pages/auth/signin/signin_from";
import NotFoundScreen from "../pages/not_found/not_found";
import { useEffect } from "react";

function MainRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/auth") {
      navigate(`/${AuthScreen.routeName}/${SignInScreen.routeName}`);
    }
  }, []);

  return (
    <Routes location={location.pathname}>
      <Route path={AuthScreen.routeName} element={<AuthScreen />}>
        <Route path={SignUpScreen.routeName} element={<SignUpScreen />} />
        <Route path={SignInScreen.routeName} element={<SignInScreen />} />
        {/* <Route path="registersuccess" element={<RegisterSuccess />} />
        <Route path="forgotpassword" element={<ForgotPassword />} /> */}
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default MainRoutes;
