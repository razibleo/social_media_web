import { Route, Routes, useLocation } from "react-router-dom";

import AuthScreen from "../pages/auth/authscreen";

function MainRoutes() {
  const location = useLocation();
  return (
    <Routes location={location.pathname}>
      <Route path="/" element={<AuthScreen />}>
        {/* <Route path="login" element={<LoginForm isLoginForm={true} />} />
        <Route path="signup" element={<LoginForm isLoginForm={false} />} />
        <Route path="registersuccess" element={<RegisterSuccess />} />
        <Route path="forgotpassword" element={<ForgotPassword />} /> */}
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default MainRoutes;
