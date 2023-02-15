import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import ProfileScreen from "../pages/profile/profilescreen";
import { AuthContext } from "../providers/authprovider";
import NotFoundScreen from "../pages/not_found/not_found";
import AuthScreen from "../pages/auth/authscreen";
import SignInScreen from "../pages/auth/signin/signin_from";

function ProtectedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

  useEffect(() => {
    if (authState.user == null) {
      navigate(`/${AuthScreen.routeName}/${SignInScreen.routeName}`);
    }
  }, []);
  console.log("location.pathname", location.pathname);

  return (
    <Routes location={location.pathname}>
      <Route path={`/${ProfileScreen.routeName}`} element={<ProfileScreen />} />
      <Route path="*" element={<NotFoundScreen />}></Route>
    </Routes>
  );
}

export default ProtectedRoutes;
