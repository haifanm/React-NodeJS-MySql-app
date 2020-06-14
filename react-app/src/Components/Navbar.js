import Auth from "../Auth";
import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"

import "../styles/App.css";

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(Auth.isAuthenticated());

    return (
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
       <nav className="navbarLoggedin">
          <h2>Cogent App</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li  onClick={ ()=>{
                      setIsAuthenticated(Auth.logout());
                      Swal.fire({
                        position: 'top-end',
                        title: "You're logged out",
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }
                  }
            >
              <Link className="logoutButton" to="/home">Logout</Link>
            </li>
          </ul>
        </nav>
      }
      </div>
    );
}