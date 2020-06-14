import React from "react";
import Navbar from "./Navbar";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function Login() {
  let history = useHistory();
  return(
    <div>
      <Navbar/>
      <h1>profile edit</h1>
      <Button onClick={()=> history.push("/profile")} variant="contained" color="Secondary">
            save changes
      </Button>
    </div>
  );
}
