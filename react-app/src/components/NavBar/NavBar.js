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
        <NavLink to="/Profile" exact={true} activeClassName="active">
          Profile
        </NavLink>
        <LogoutButton />
      </div>
    );
  } else {
    setLinks = (
      <div className={styles.navLinks}>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <NavLink to="/" exact={true} activeClassName="active">
          Nitro Code
        </NavLink>
      </div>
      {setLinks}
    </div>
  );
};

export default NavBar;
