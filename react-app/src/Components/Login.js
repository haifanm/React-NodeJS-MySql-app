import React from "react";
import {useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";
import Auth from "../Auth";

import "./style.css";

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
    alert(JSON.stringify(data));
    console.log(data);

    let hashedPassword = await bcrypt.hash(data.password, 8);
    data.password=hashedPassword;
    
    console.log("pass: "+data.password)
    axios({
      url: "/auth/login",
      method: "POST",
      data: data,
    })
      .then(function (response) {
        console.log("here?")
        console.log(response)
        if (response.status === 200 && response.data.message==="loggedin"){ 
          setMessage();
          console.log("logged in:)!!!");
          Auth.login()
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Please fill in your information</h1>
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
  );
}

export default Login;
