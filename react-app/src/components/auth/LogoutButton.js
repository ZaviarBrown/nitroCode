import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import styles from "./LogoutButton.module.css";
const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <button className={styles.logout} onClick={onLogout}>
      <div>Logout</div>
    </button>
  );
};

export default LogoutButton;
