import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPassword, setDemoPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      await fetch("/api/stat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      setErrors("Passwords do not match");
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setDemoEmail("demo@aa.io");
    setDemoPassword("password");
    dispatch(login(demoEmail, demoPassword));
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/practice" />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSignUp}>
        <div>{errors}</div>
        <div>
          <label>Username: </label>
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email: </label>
          <input
            className={styles.input}
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password: </label>
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className={styles.buttons}>
          <button type="submit">Sign Up</button>
          <button onClick={(e) => demoLogin(e)}>Demo</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
