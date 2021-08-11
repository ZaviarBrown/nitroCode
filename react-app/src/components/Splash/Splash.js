import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./Splash.module.css";

const Splash = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.red}>Dev</h1>
        <h1 className={styles.blue}>Dash</h1>
        <h1 className={styles.under}>_</h1>
      </div>
      <div className={styles.buttonContainer}>
        <NavLink
          className={styles.auth}
          to={"/login"}
          exact={true}
          activeClassName="active"
        >
          <div className={styles.button}>Login</div>
        </NavLink>
        <NavLink
          className={styles.auth}
          to="/sign-up"
          exact={true}
          activeClassName="active"
        >
          <div className={styles.button}>Sign Up</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Splash;
