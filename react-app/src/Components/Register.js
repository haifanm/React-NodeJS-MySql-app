import React from "react";
import {useHistory} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import countryList from "react-select-country-list";
import ReactSelect from "react-select";
import axios from "axios";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";

import Navbar from "./Navbar";

import "../styles/style.css";

function Register() {
  let history = useHistory();
  const [message, setMessage] = React.useState('');
  const {
    register,
    errors,
    handleSubmit,
    watch,
    triggerValidation,
    control,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {

    let hashedPassword = await bcrypt.hash(data.password, 8);
    data.password=hashedPassword;
    
    axios({
      url: "/api/auth/register",
      method: "POST",
      data: data,
    })
      .then(function (response) {
        if (response.status === 200 && response.data.message==="added"){ 
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Account created',
            showConfirmButton: false,
            timer: 1500
          })

          setMessage();
          history.push("/login")
        }
          
        else {
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
      <h1>Please fill in your information</h1>
      {message ? <p>{message}</p> : <div></div> }
      <label htmlFor="username">Username</label>
      <input
        name="username"
        ref={register({
          required: "this is a required",
          minLength: {
            value: 3,
            message: "Min length is 3",
          },
          maxLength: {
            value: 10,
            message: "Max length is 10",
          },
        })}
      />
      {errors.username && <p>{errors.username.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="text"
        ref={register({
          required: "this is required",
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="age">Age</label>
      <input
        name="age"
        type="number"
        ref={register({
          required: "this is required",
          maxLength: {
            value: 3,
            message: "Max length is 3",
          },
          pattern: {
            value: /^[0-9]+/,
            message: "Invalid age value",
          },
        })}
      />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="phone">Phone Number</label>
      <input
        name="phone"
        placeholder="96133333333"
        ref={register({
          required: "this is required",
          maxLength: {
            value: 18,
            message: "Max length is 18",
          },
          pattern: {
            value: /^[0-9]+/,
            message: "Invalid phone number",
          },
        })}
      />
      {errors.phone && <p>{errors.phone.message}</p>}

      <label htmlFor="country">Country</label>
      <Controller
        as={ReactSelect}
        options={countryList().getData()}
        name="country"
        isClearable
        control={control}
        rules={{ required: true, message: "this is required" }}
      />
      {errors.country && <p>this is required</p>}

      <label htmlFor="company">Company Name</label>
      <input
        name="company"
        ref={register({
          required: "this is required",
          maxLength: {
            value: 25,
            message: "Max length is 25",
          },
        })}
      />
      {errors.company && <p>{errors.company.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        name="password"
        ref={register({
          required: "this is required",
          minLength: {
            value: 5,
            message: "Min length is 5",
          },
          maxLength: {
            value: 15,
            message: "Max length is 15",
          },
        })}
        onChange={() => {
          triggerValidation("passwordConfirm");
        }}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input
        name="passwordConfirm"
        ref={register({
          required: "this is required",
          // validate: value => value === watch("password"),
          validate: (value) => {
            if (value !== watch("password")) {
              return "Passwords do not match";
            }
            return true;
          },
        })}
      />
      {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}

      <input type="submit" />
    </form>
    </div>
  );
}

export default Register;
