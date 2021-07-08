import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/Users/UsersList";
import User from "./components/Users/User";
import { authenticate } from "./store/session";
import Typing from "./components/Typing/Typing";
import Splash from "./components/Splash/Splash";
import Stats from "./components/Stats/Stats";
import Friends from "./components/Friends/Friends";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/race" exact={true}>
          <NavBar />
          <Typing />
        </ProtectedRoute>
        <ProtectedRoute path="/stats/:username" exact={true}>
          <Stats />
        </ProtectedRoute>
        <ProtectedRoute path="/friends" exact={true}>
          <NavBar />
          <Friends />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true}>
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar />
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
