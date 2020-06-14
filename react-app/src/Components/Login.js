import React from "react";
import {useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2"

import Auth from "../Auth";
import Navbar from "./Navbar";
import "../styles/style.css";

function Login() {
  let history = useHistory();
  const [message, setMessage] = React.useState('');
  const {
    register,
    errors,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {

    console.log(data);

    axios({
      url: "/api/auth/login",
      method: "POST",
      data: data,
    })
      .then(function (response) {
        console.log("here?")
        console.log(response)
        if (response.status === 200 && response.data.message==="loggedin"){ 
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
          })
          setMessage();
          console.log("logged in:)!!!");

          //get token from response
          //send token to auth.login
          Auth.login(response.data.token)
          
          history.push("/home")
        }
          
        else {
          console.log("response.message");
          console.log(response.data.message);
          setMessage(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Please enter your login credentials</h1>
      {message ? <p>{message}</p> : <div></div> }
      <label htmlFor="username">Username</label>
      <input
        name="username"
        ref={register({
          required: "this is a required",
        })}
      />
      {errors.username && <p>{errors.username.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        name="password"
        ref={register({
          required: "this is required",
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" />
    </form>
    </div>
  );
}

export default Login;
