import React from 'react'
import { Button } from '@mui/material';
import { cloneDeep } from '../utils/helper';
import { useAuth } from "../context/AuthProvider";
import {  useNavigate } from 'react-router-dom';

export default function ListScreen() {
    const {candidateList,setSelectedCandidate,
        setEditDetails,setHobbyArray}=useAuth();
        const navigate = useNavigate();
    const handleItemClick =(e)=>{
        if(e?.target?.tagName === "LI"){
          let dataObj = candidateList.find(x=> x.id === e.target.id);
          setSelectedCandidate(cloneDeep(dataObj));
          setEditDetails(true);
          setHobbyArray([...dataObj?.hobbies]);
          navigate(`/candidate/${e?.target?.id}`);
        }
    }
    const handleAddNew =(e)=>{
        e.preventDefault();
        let newObj = {"profile_picture": "",
        "name": "",
        "address": "",
        "phone": "",
        "email": "",
        "gender": "",
        "hobbies": [],
        "education": [],
        "skills": [],
        "experience": [],
        "id": "New_1"
        };
        setSelectedCandidate(newObj);
        navigate(`/candidate/new`);
    }
    
  return (
    <><h3>
    List of candidates <Button variant="contained" onClick={handleAddNew}>Add</Button>
  </h3>
  <div id="dataListContainer">
    {candidateList ? (
      <ul onClick={handleItemClick}>
        {candidateList &&
          candidateList.map((item, idx) => (
            <li key={item.id} id={item.id} name={item.id} idx={idx}>
              {item.name}
            </li>
          ))}
      </ul>
    ) : (
      <span>no data</span>
    )}
  </div></>
  )
}
