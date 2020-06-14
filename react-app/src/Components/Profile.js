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
  }, [])
  
  const getProfileData = () => {
    const userData={
      token: Auth.getToken()
    }
    axios({
      url: "/api/profile",
      method: "GET",
      headers: {
        Authorization: "Bearer " + userData.token
      }
    })
      .then(function (response) {


        if (response.status === 200){ 
          
          const profiledata= response.data
          setData(profiledata)
  
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

  const deleteAccountAction = () => {

    axios({
      url: "/api/profile",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + Auth.getToken()
      }
    })
      .then(function (response) {

        if (response.status === 200){ 
          Auth.logout();
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "You account has been deleted",
            showConfirmButton: false,
            timer: 1500
          })
          
          history.push("/home")
        }

        else if (response.status === 403){ 
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You don't have access",
            showConfirmButton: false,
            timer: 1500
          })
          Auth.logout();

          history.push("/home")
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
        <Button style={{margin:'10px'}} onClick={()=> history.push("/editprofile")} variant="contained" component="span" color="primary">
          edit profile
        </Button>

        <Button style={{margin:'10px'}} onClick={() => deleteAccountAction()} variant="contained" component="span" color="secondary">
          delete account
        </Button>

      </div>}
    
    
  </div>);
  
}





