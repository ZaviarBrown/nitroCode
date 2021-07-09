import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  let setLinks;

  if (sessionUser) {
    setLinks = (
      <div className={styles.navLinks}>
        <NavLink to="/race" exact={true} activeClassName="active">
          Race
        </NavLink>
        <NavLink
          to={`/stats/${sessionUser.username}`}
          exact={true}
          activeClassName="active"
        >
          Profile
        </NavLink>
        <NavLink to="/friends" exact={true} activeClassName="active">
          Friends
        </NavLink>
        <LogoutButton />
      </div>
    );
  } else {
    setLinks = (
      <div className={styles.navLinks}>
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <NavLink
          className={styles.red}
          to="/"
          exact={true}
          activeClassName="active"
        >
          Nitro
        </NavLink>
        <NavLink to="/" exact={true} activeClassName="active">
          Code
        </NavLink>
        <NavLink
          className={styles.under}
          to="/"
          exact={true}
          activeClassName="active"
        >
          _
        </NavLink>
      </div>
      <div className={styles.navLinks}>{setLinks}</div>
    </div>
  );
};

export default NavBar;
