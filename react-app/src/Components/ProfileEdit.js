import React from "react";
import Navbar from "./Navbar";
import { useForm, Controller } from "react-hook-form";
import {useHistory} from "react-router-dom";
import countryList from "react-select-country-list";
import ReactSelect from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

import Auth from "../Auth";

function ProfileEdit() {
  let history = useHistory();
  const {
    register,
    errors,
    handleSubmit,
    // watch,
    // triggerValidation,
    control,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("on submit:");
    console.log(data);
    history.push("/profile")

    axios({
      url: "/api/profile",
      method: "PUT",
      data: data,
      headers: {
        Authorization: "Bearer " + Auth.getToken()
      }
    })
    .then(function (response) {

      if (response.status === 200 && response.data.message==="edited"){ 
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Account data updated',
          showConfirmButton: false,
          timer: 1500
        })

        history.push("/profile")
      }
        
      else {
        console.log("response.message");
        console.log(response.data.message);
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
      <h1>Edit your profile</h1>
      
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="text"
        ref={register({
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
      />
      {errors.country && <p>this is required</p>}

      <label htmlFor="company">Company Name</label>
      <input
        name="company"
        ref={register({
          maxLength: {
            value: 25,
            message: "Max length is 25",
          },
        })}
      />
      {errors.company && <p>{errors.company.message}</p>}

      
      <input style={{backgroundColor:"#3039b8"}} type="submit" value="Save changes" />
    </form>
    </div>
  );
}

export default ProfileEdit;