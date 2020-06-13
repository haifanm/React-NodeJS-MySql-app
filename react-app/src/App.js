import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Auth from "./Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(Auth.isAuthenticated());
  
  return (
    <Router>
      <div>
      {!isAuthenticated ?
        <nav className="navbar">
          <h2>Cogent App</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login" >Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
       :
       <nav className="navbar">
          <h2>Cogent App</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li  onClick={()=>setIsAuthenticated(Auth.logout())}>
              <Link className="logoutButton" to="/home">Logout</Link>
            </li>
          </ul>
        </nav>
      }
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
