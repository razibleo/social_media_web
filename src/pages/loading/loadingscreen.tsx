import { Spin } from "antd";
import RouteProperty from "../../utils/routeproperty";
import styles from "./loadingscreen.module.scss";
import { FC } from "react";

const LoadingScreen: FC & RouteProperty = () => {
  return (
    <div className={styles["wrapper"]}>
      <Spin size="large" />
    </div>
  );
};
LoadingScreen.routeName = "profile";
export default LoadingScreen;
