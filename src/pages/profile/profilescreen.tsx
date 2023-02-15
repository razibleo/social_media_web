import styles from "./profilescreen.module.scss";
import RouteProperty from "../../utils/routeproperty";
import { FC } from "react";
import { AuthContext } from "../../providers/authprovider";

const ProfileScreen: FC & RouteProperty = () => {
  return (
    <div className={styles["wrapper"]}>
      <AuthContext.Consumer>
        {(state) => {
          return (
            <>
              <h2> Profile Screen</h2>
              <p> {state.user?.fullname}</p>
            </>
          );
        }}
      </AuthContext.Consumer>
    </div>
  );
};
ProfileScreen.routeName = "profile";
export default ProfileScreen;
