import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Login = ()=>{
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async()=>{
    const res = await axios.post("http://localhost:5000/api/auth/login", {userName, password});
    localStorage.setItem("token", res.data.token);
    window.location.reload();
  };

  return(
    <div>
        <input type="text" placeholder="UserName" onChange={(e)=> setUserName(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={{handleLogin}}>Login</button>
    </div>
  );
  
};



export default Login;
