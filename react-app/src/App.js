import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Redirect} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import ProfileEdit from "./Components/ProfileEdit";
import Login from "./Components/Login";
import Register from "./Components/Register";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/editprofile">
            <ProfileEdit />
          </Route>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/">
          <Redirect to = {"/home"} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
