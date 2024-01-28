import './App.css';
import HandleRoutes from './components/HandleRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <HandleRoutes />
    </GoogleOAuthProvider>
  );
}

export default App;
