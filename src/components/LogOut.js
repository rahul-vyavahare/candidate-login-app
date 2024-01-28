import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useAuth } from '../context/AuthProvider';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout() {
    const {setUser,auth,setAuth} = useAuth();
  const onSuccess = () => {
    console.log('Logout made successfully');
    setAuth(false);
    setUser(null);
   // alert('Logout made successfully ✌');
  };

  return (
    <div>
     {auth ?<GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>:null}
    </div>
  );
}

export default Logout;