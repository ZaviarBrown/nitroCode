import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllRequests } from "../../store/friend";
import LogoutButton from "../auth/LogoutButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  let setLinks;
  let preUrl = window.location.href;
  let prePath = preUrl.includes("nitro") ? preUrl.slice(31) : preUrl.slice(21);
  const history = useHistory();
  const dispatch = useDispatch();
  const [path, setPath] = useState(prePath);
  const sessionUser = useSelector((state) => state.session.user);

  const newPath = () => {
    return history.listen((location) => {
      setPath(location.pathname);
    });
  };

  useEffect(() => {
    newPath();
    if (sessionUser) dispatch(getAllRequests());
  }, [path]);

  if (sessionUser) {
    setLinks = (
      <div className={styles.navLinks}>
        <NavLink to="/practice" exact={true} activeClassName={styles.active}>
          Practice
        </NavLink>
        <NavLink
          to={`/stats/${sessionUser.username}`}
          exact={true}
          activeClassName={styles.active}
        >
          Profile
        </NavLink>
        <NavLink to="/friends" exact={true} activeClassName={styles.active}>
          Friends
        </NavLink>
        <LogoutButton />
      </div>
    );
  } else {
    setLinks = (
      <div className={styles.navLinksHome}>
        {path !== "/login" ? (
          <div>
            <NavLink to="/login" exact={true} activeClassName={styles.active}>
              Login
            </NavLink>
          </div>
        ) : null}
        {path !== "/sign-up" ? (
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName={styles.active}>
              Sign Up
            </NavLink>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.navBar}>
      {path !== "/" ? (
        <div className={styles.logo}>
          <NavLink
            className={styles.red}
            to="/"
            exact={true}
            activeClassName={styles.active}
          >
            Dev
          </NavLink>
          <NavLink
            className={styles.blue}
            to="/"
            exact={true}
            activeClassName={styles.active}
          >
            Dash
          </NavLink>
          <NavLink
            className={styles.under}
            to="/"
            exact={true}
            activeClassName={styles.active}
          >
            _
          </NavLink>
        </div>
      ) : (
        <div className={styles.logo}></div>
      )}
      <div className={styles.space}></div>
      <div className={styles.navLinksContainer}>
        <div>{setLinks}</div>
      </div>
    </div>
  );
};

export default NavBar;
