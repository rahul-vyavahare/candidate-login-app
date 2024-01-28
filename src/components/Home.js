import React from 'react'
import {  useNavigate ,Navigate,useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Button } from '@mui/material';
export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
const {auth}=useAuth();
const handleLogInNavigate =()=>{
    navigate('/login');
}
if(auth){
  return <Navigate to='/candidate'/>;
 }
  return (
    <div id ='homeWrapper'>
      <h1>Candidates LogIn App</h1>
      {auth ? null :<Button variant="contained" onClick={handleLogInNavigate}>Go to LogIn page</Button>}
    </div>
  );
}
