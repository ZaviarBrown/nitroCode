import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllRequests } from "../../store/friend";
import { login } from "../../store/session";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    dispatch(getAllRequests());
    if (data.errors) {
      setErrors(data.errors);
    }
		
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/race" />;
  }

  const demoLogin = () => {
    setEmail("demo@aa.io");
    setPassword("password");
    login(email, password);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            className={styles.input}
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <div className={styles.buttons}>
            <button type="submit">Login</button>
            <button onClick={demoLogin}>Demo</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
