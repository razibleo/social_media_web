import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUpScreen from "../pages/auth/signup/signup_from";
import AuthScreen from "../pages/auth/authscreen";
import SignInScreen from "../pages/auth/signin/signin_from";
import NotFoundScreen from "../pages/not_found/not_found";
import { useContext, useEffect, useState } from "react";
import ProtectedRoutes from "./protectedroutes";
import LoadingScreen from "../pages/loading/loadingscreen";
import { AuthContext } from "../providers/authprovider";
import ProfileScreen from "../pages/profile/profilescreen";

function MainRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authState = useContext(AuthContext);

  useEffect(() => {
    const userId = "541DO6wtEqVKg7mZJDQxwUdP6dy1"; //localStorage.getItem("user_id");
    if (userId != null) {
      authState.getUserDetailsById(userId).then((user) => {
        if (user != null) {
          setIsLoading(false);
          navigate(`/user/${ProfileScreen.routeName}`);
          return;
        }
        localStorage.clear();
        redirect();
      });
    } else {
      redirect();
    }
  }, []);

  function redirect() {
    setIsLoading(false);

    if (location.pathname === "/" || location.pathname === "/auth") {
      navigate(`/${AuthScreen.routeName}/${SignInScreen.routeName}`);
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes location={location.pathname}>
          <Route path={AuthScreen.routeName} element={<AuthScreen />}>
            <Route path={SignUpScreen.routeName} element={<SignUpScreen />} />
            <Route path={SignInScreen.routeName} element={<SignInScreen />} />
            {/* <Route path="registersuccess" element={<RegisterSuccess />} />
            <Route path="forgotpassword" element={<ForgotPassword />} /> */}
          </Route>
          <Route path={"/user/*"} element={<ProtectedRoutes />} />

          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      )}
    </>
  );
}

export default MainRoutes;
