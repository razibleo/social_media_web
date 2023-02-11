import { useOutlet } from "react-router-dom";
import styles from "./authscreen.module.scss";
import RouteProperty from "../../utils/routeproperty";
import { FC } from "react";

const AuthScreen: FC & RouteProperty = () => {
  const currentOutlet = useOutlet();
  return <div className={styles["wrapper"]}>{currentOutlet}</div>;
};
AuthScreen.routeName = "auth";
export default AuthScreen;
