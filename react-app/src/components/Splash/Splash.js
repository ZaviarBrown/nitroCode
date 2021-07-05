import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./Splash.module.css";

const Splash = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.green}>Nitro</h1>
        <h1 className={styles.red}>Code_</h1>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <NavLink
            className={styles.auth}
            to="/login"
            exact={true}
            activeClassName="active"
          >
            Login
          </NavLink>
        </div>
        <div className={styles.button}>
          <NavLink
            className={styles.auth}
            to="/sign-up"
            exact={true}
            activeClassName="active"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Splash;
