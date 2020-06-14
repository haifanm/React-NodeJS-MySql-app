import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth";
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';

import Navbar from "./Navbar";



export default function Profile() {
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // React.useEffect(() => {
  //   if (!data) {
  //     getProfileData();
  //   }
  // }, []);

  useEffect(() => {
    setLoading(true); // here 
    getProfileData();
    console.log(loading)
  }, [])
  
  const getProfileData = () => {
    const data={
      username: "haifanaim",
      token: Auth.getToken()
    }
    console.log("in function")
    console.log(data)
    axios({
      url: "/api/profile",
      method: "GET",
      headers: {
        Authorization: "Bearer " + data.token
      }
    })
      .then(function (response) {
        console.log("here?")
        console.log(response)
        if (response.status === 200){ 
          
          const profiledata= response.data
          setData(profiledata)
  
          console.log("GOT MY DATA :)");
          console.log(profiledata)
        }
          
        else {
          console.log("response.message");
          console.log(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
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
    ? <ReactLoading className="loading" type={"spin"} color={"#19bb34"} height={200}  />
    : <div className="profileDataDiv">
        <h4>Username: {data.profile.username}</h4>
        <h4>Email: {data.profile.email}</h4>
        <h4>Age: {data.profile.age}</h4>
        <h4>Phone: {data.profile.phone}</h4>
        <h4>Country: {data.profile.country}</h4>
        <h4>Company: {data.profile.company}</h4>
        {/* <button onClick={()=> history.push("/editprofile")}>edit profile</button> */}
        <Button onClick={()=> history.push("/editprofile")} variant="contained" color="Secondary">
          edit profile
        </Button>
      </div>}
    
    
  </div>);
  
}





