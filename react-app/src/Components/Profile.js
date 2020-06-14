import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth";
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';
import Swal from "sweetalert2"

import Navbar from "./Navbar";


export default function Profile() {
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({profile:{username:"",email:"",age:"",phone:"",country:"",company:""}});

  useEffect(() => {
    setLoading(true); // here 
    getProfileData();
    console.log(loading)
  }, [])
  
  const getProfileData = () => {
    const userData={
      token: Auth.getToken()
    }
    console.log("in function")
    console.log(userData)
    axios({
      url: "/api/profile",
      method: "GET",
      headers: {
        Authorization: "Bearer " + userData.token
      }
    })
      .then(function (response) {


        console.log("here? in main then")
        if (response.status === 200){ 
          
          const profiledata= response.data
          setData(profiledata)
  
          console.log("GOT MY DATA :)");
          console.log(profiledata)
        }

        else if (response.status === 403){ 
          history.push("/home")
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You don't have access",
            showConfirmButton: false,
            timer: 1500
          })
          
        }
        else {
        }
      })
      .catch(function (response) {
        history.push("/home")
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You don't have access",
          showConfirmButton: false,
          timer: 1500
        })
      })
      .finally( ()=> {
        setLoading(false);
      });
  }

  return (
  <div>
    <Navbar/>
    <h1>Your Profile</h1>

    {loading 
    ? <ReactLoading className="loading" type={"spin"} color={Auth.isAuthenticated()?"#3039b8":"#19bb34"} height={200}  />
    : <div className="profileDataDiv">
        <h4>Username: {data.profile.username}</h4>
        <h4>Email: {data.profile.email}</h4>
        <h4>Age: {data.profile.age}</h4>
        <h4>Phone: {data.profile.phone}</h4>
        <h4>Country: {data.profile.country}</h4>
        <h4>Company: {data.profile.company}</h4>
        <Button onClick={()=> history.push("/editprofile")} variant="contained" color="secondary">
          edit profile
        </Button>
      </div>}
    
    
  </div>);
  
}





