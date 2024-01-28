import React,{useEffect} from 'react';
import { useAuth } from '../context/AuthProvider';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate,useLocation,Navigate } from 'react-router-dom';

function LogIn() {
  
  const {setUser,auth,setAuth} = useAuth();
const navigate = useNavigate();
const location = useLocation();
const from = location?.state?.from?.pathname || '/'
if(auth){
 return <Navigate to='/candidate'/>;
}
  return (
    <div id="homeWrapper">
      <h1>LogIn</h1>
      <GoogleLogin
  onSuccess={credentialResponse => {
    //console.log(credentialResponse);
    const decoded = jwtDecode(credentialResponse?.credential);
    //console.log(decoded);
    setAuth(true);
    setUser({name:decoded.given_name});
    navigate(from,{replace:true});
  }}
  onError={() => {
    setAuth(false);
    setUser(null);
    console.log('Login Failed');
  }}
/>

    </div>
  );
}

export default LogIn;