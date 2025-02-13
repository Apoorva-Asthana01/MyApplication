import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const App = ()=>{
  const [role, setRole] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:/5000/api/user", {headers: {Authorization:token}})
      .then((res) =>setRole(res.data.role))
      .catch(()=> setRole("guest"));
  }, []);

  return(
    <div>
      <h1>Dashboard</h1>
      {role === "admin" && <p>Wecome Admin! You have full access</p>}
      {role === "user" && <p>Wecome User! You have limited access</p>}
    </div>
  )
}




export default App;
