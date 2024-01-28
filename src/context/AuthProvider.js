import { useState,createContext,useContext ,useMemo} from "react";


const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [user,setUser] =useState(null);
    const [auth,setAuth] =useState(false);
    const [candidateList,setCandidateList] = useState([]);
    const [selectedCandidate,setSelectedCandidate] = useState(null);
    const [hobbyArray,setHobbyArray] = useState([]);
    const [editDetails,setEditDetails] = useState(true);
    const [currentStep,setCurrentStep] = useState(1);
    const stepsName=["","Personal Details","Education","Skills","Experience"];

    const contextValue = useMemo(
        () => ({
            user,setUser,auth,setAuth,candidateList,setCandidateList,selectedCandidate,setSelectedCandidate,
            editDetails,setEditDetails,currentStep,setCurrentStep,stepsName,hobbyArray,setHobbyArray
        }),
        [auth,user,candidateList,selectedCandidate,editDetails,currentStep]
      );
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
  };
  export default AuthProvider;  