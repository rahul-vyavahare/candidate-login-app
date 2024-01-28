import React,{useState,useEffect} from 'react'
import { useAuth } from "../context/AuthProvider";
import {TextField,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel,InputLabel,
    Select,MenuItem,Checkbox,ListItemText,OutlinedInput,Button} from '@mui/material';
    import { cloneDeep } from '../utils/helper';
    import errorImg from "../assets/error-img.png";
import { useParams,useLocation } from 'react-router-dom';

export default function Form() {
    const {candidateList,selectedCandidate,setSelectedCandidate,
        setEditDetails,currentStep,setCurrentStep,stepsName,setHobbyArray}=useAuth();
        const [isValidUrl,setIsValidUrl]=useState(true);
          const handleEdit = ()=>{
              setEditDetails(false);
            }
          const handleBack =(e)=>{
              e.preventDefault();
               setCurrentStep(currentStep - 1);
          }
          const handleNext =(e)=>{
              e.preventDefault();
              setCurrentStep(currentStep + 1);
          }
          let { id } = useParams();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) {
      if (location.pathname === "/candidate/new") {
        let newObj = {
          profile_picture: "",
          name: "",
          address: "",
          phone: "",
          email: "",
          gender: "",
          hobbies: [],
          education: [],
          skills: [],
          experience: [],
          id: "New_1",
        };
        setSelectedCandidate(newObj);

      } else if (id && !isNaN(Number(id)) && location.pathname === `/candidate/${id}`) {
        let dataObj = candidateList.find((x) => x.id === id);
        if(dataObj){
        setSelectedCandidate(cloneDeep(dataObj));
        setEditDetails(true);
        setHobbyArray([...dataObj?.hobbies]);
      }
      else{
        setIsValidUrl("Record not exists");
      }
      
    }
  }}, [location,id]);
  if(isValidUrl === "Record not exists"){
    return(<h3>Record not exists</h3>)
  }
  return (
    
    
       <> <h3>
            Details
            {selectedCandidate ? (
              <div><Button variant="contained" onClick={handleEdit}sx={{marginRight:'5px'}}>Edit</Button><Button variant="contained" color="error">Delete</Button></div>
            ) : null}
          </h3>
          {selectedCandidate ? (
            <>
              <div id="stepContainer">
                <div>
                  {currentStep ? (
                    <>
                      <div
                        className={
                          currentStep === 1 ? "stepChild active" : "stepChild"
                        }
                      >
                        1
                      </div>
                      <div
                        className={
                          currentStep === 2 ? "stepChild active" : "stepChild"
                        }
                      >
                        2
                      </div>
                      <div
                        className={
                          currentStep === 3 ? "stepChild active" : "stepChild"
                        }
                      >
                        3
                      </div>
                      <div
                        className={
                          currentStep === 4 ? "stepChild active" : "stepChild"
                        }
                      >
                        4
                      </div>
                    </>
                  ) : null}
                </div>
                <h4>{currentStep ? stepsName[currentStep] : null}{selectedCandidate.id === "New_1"? ": (New)": null}</h4>
              </div>
              <div id="detailsContainer">
              <div className="footerButtonContainer"><Button variant="text" onClick={handleBack} disabled={currentStep < 2 ? true:false}>Back</Button>
                <Button variant="text" onClick={handleNext} disabled={currentStep > 3 ? true:false}>Next</Button></div>
              
                {currentStep === 1 ? <ProfileDetails /> :null}
                {currentStep === 2 ? <Education /> :null}
                {currentStep === 3 ? <Skills /> :null}
                {currentStep === 4 ? <Experience /> :null}
                </div>
            </>
          ) : null}
    </>
  )
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ProfileDetails (){
  const {selectedCandidate,setSelectedCandidate,editDetails,hobbyArray}=useAuth();

       
const handleChange = (event) => {
    const { name, value } = event.target;
    let selCandidate = cloneDeep(selectedCandidate);
    if(name ==="hobbies")
    {
        selCandidate[name]=typeof value === 'string' ? value.split(',') : value;
    }else
    {
        selCandidate[name] = value;
    }
    
    setSelectedCandidate(selCandidate);
  };
  const addDefaultImg = (e) => {
    e.currentTarget.src = errorImg;
 }
    return (<><div className="profileImgContainer">
    <img
      src={selectedCandidate?.profile_picture}
      alt="" onError={addDefaultImg}
    />
  </div>
  <div className="step-1-info">
    <div className=""><TextField type="text" id="name" label="Name" variant="outlined" name="name" onChange={handleChange} value={selectedCandidate?.name} size="small" fullWidth disabled={editDetails}/></div>
    <div className=""><TextField type="email" id="email" label="Email" variant="outlined" name="email" onChange={handleChange} value={selectedCandidate?.email} size="small" fullWidth disabled={editDetails}/></div>
    <div className=""><FormControl fullWidth>
      <FormLabel id="gender-buttons">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="gender-buttons"
        name="gender"
        value={selectedCandidate?.gender}
        onChange={handleChange}
        disabled={editDetails}
      >
        <FormControlLabel value="Female" control={<Radio disabled={editDetails}/>} label="Female" />
        <FormControlLabel value="Male" control={<Radio disabled={editDetails}/>} label="Male" />
        
      </RadioGroup>
    </FormControl></div>
    <div className=""><FormControl sx={{ }} fullWidth>
        <InputLabel id="hobbySelect">Hobbies</InputLabel>
        <Select
          labelId="hobbySelect"
          id="hobbySelect-multiple"
          multiple
          value={selectedCandidate?.hobbies}
          name = "hobbies"
          onChange={handleChange}
          input={<OutlinedInput label="Hobbies" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          disabled={editDetails}
        >
          {hobbyArray.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedCandidate?.hobbies.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl></div>
  </div></>);
}
function Education(){
  const {selectedCandidate,setSelectedCandidate,editDetails}=useAuth();

  const [years,setYears]=useState([]);

  useEffect(()=>{
    
    const y = [];
    for (let year = 1950; year <= 2024; year++) {
      y.push(''+year);
    }
    setYears(y);
  },[]);
  const handleAdd =(e)=>{
    e.preventDefault();
    if(selectedCandidate.education.length < 10){
      let selData = cloneDeep(selectedCandidate);
    let eData = selData.education;
    eData.push({"institute": "",
    "degree": "",
    "percentage":"" ,
    "pass_out_year": ""});
    selData.education = eData;
    setSelectedCandidate(selData);
    }else{
      alert("up to 10 entries allowed");
    }
  }
  const handleChange =(e)=>{
    const {name,value,id} = e.target;
    let selData = cloneDeep(selectedCandidate);
    let eData = selData.education;
    eData[Number(id)][name]=value;
    selData.education = eData;
    setSelectedCandidate(selData);
  }
  const handleYearChange =idx=>e=>{
    const {name,value} = e.target;
    let selData = cloneDeep(selectedCandidate);
    let eData = selData.education;
    eData[idx][name]=value;
    selData.education = eData;
    setSelectedCandidate(selData);
  }
  return(<div className="step-2-info">
    <div><Button variant="text" onClick={handleAdd} disabled={editDetails}>Add</Button></div>
    <div><table>
      <thead><tr><th>Institute</th><th>Year</th></tr></thead>
      <tbody>{selectedCandidate.education && selectedCandidate.education.map((el,idx)=><tr key={idx}>
        <td><input type="text" name="institute" value={el.institute} onChange={handleChange} id={idx} disabled={editDetails}/></td>
      <td>
      <FormControl fullWidth size="small" variant="outlined">
        <Select
          disabled={editDetails}
          value={el.pass_out_year}
          name = "pass_out_year"
          onChange={handleYearChange(idx)}
          MenuProps={{
            style: {
                maxHeight: 200
            },
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
            },
            transformOrigin: {
                vertical: "top",
                horizontal: "left"
            },
            getContentAnchorEl: null
        }}
        id={''+idx}
        >
          {years.map((y,idx) => (
            <MenuItem key={y} value={y} >
              <ListItemText primary={y} />
            </MenuItem>
          ))}
        </Select></FormControl>
      </td></tr>)}</tbody></table></div>
         
  </div>);
}
function Skills(){
  const {selectedCandidate,setSelectedCandidate,editDetails}=useAuth();
  const handleChange =(e)=>{
    const {name,value,id} = e.target;
    let selData = cloneDeep(selectedCandidate);
    let sData = selData.skills;
    sData[Number(id)][name]=value;
    selData.skills = sData;
    setSelectedCandidate(selData);
   
  }
  const handleAdd =(e)=>{
    e.preventDefault();
    if(selectedCandidate.skills.length < 10){
      let selData = cloneDeep(selectedCandidate);
    let sData = selData.skills;
    sData.push({"name": "",
    "experience": ""});
    selData.skills = sData;
    setSelectedCandidate(selData);
   
    }else{
      alert("up to 10 entries allowed");
    }
  }
  return(<div className="step-3-info">
  <div><Button variant="text" onClick={handleAdd} disabled={editDetails}>Add</Button></div>
  <div><table>
    <thead><tr><th>Name</th><th>Experience</th></tr></thead>
    <tbody>{selectedCandidate.skills && selectedCandidate.skills.map((el,idx)=><tr key={idx}>
      <td><input type="text" name="name" value={el.name} onChange={handleChange} id={idx} disabled={editDetails} placeholder='name'/></td>
    <td>
    <input type="number" name="experience" value={el.experience} onChange={handleChange} id={idx} disabled={editDetails} placeholder='experience'/>
    </td></tr>)}</tbody></table></div>
       
</div>)
}

function Experience() {
  const {selectedCandidate,setSelectedCandidate,editDetails}=useAuth();

  const handleChange =(e)=>{
    const {name,value,id} = e.target;
    let selData = cloneDeep(selectedCandidate);
    let eData = selData.experience;
    eData[Number(id)][name]=(name === "duration_from" ||name === "duration_to") ?formatDate(value,'nTow') :value;
    selData.experience = eData;
    setSelectedCandidate(selData);
  }
  const handleAdd =(e)=>{
    e.preventDefault();
    if(selectedCandidate.experience.length < 10){
      let selData = cloneDeep(selectedCandidate);
    let eData = selData.experience;
    eData.push({"company": "",
    "project": "",
    "role": "",
    "team_size": "",
    "duration_from": "",
    "duration_to": ""
    });
    selData.experience = eData;
    setSelectedCandidate(selData);
   
    }else{
      alert("up to 10 entries allowed");
    }
  }
  const formatDate = (dateString,type)=> {
    if(type === "nTow" ){
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[parseInt(month, 10) - 1]; 
    return `${monthName} ${year}`;
  }
  else{
    const [month, year] = dateString.split(' ');
    const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1; 
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex; 
    return `${year}-${formattedMonth}`;
  }
  }
  return (
    <div className="step-4-info">
  <div><Button variant="text" onClick={handleAdd}>Add</Button></div>
  <div><table>
    <thead><tr><th>Company</th><th>Project</th><th>Role</th><th colSpan="2">Duration</th></tr>
    <tr>
      <th></th> 
      <th></th> 
      <th></th> 
      <th>From</th> 
      <th>To</th> 
    </tr></thead>
    <tbody>{selectedCandidate.experience && cloneDeep(selectedCandidate.experience).map((el,idx)=><tr key={idx}>
      <td><input type="text" name="company" value={el.company} onChange={handleChange} disabled={editDetails} id={idx}/></td>
    <td>
    <input type="text" name="project" value={el.project} onChange={handleChange} disabled={editDetails} id={idx}/>
    </td>
    <td>
    <input type="text" name="role" value={el.role} onChange={handleChange} disabled={editDetails} id={idx}/>
    </td>
    <td>
    <input type="month" name="duration_from" value={formatDate(el.duration_from,'wTon')} disabled={editDetails} onChange={handleChange} id={idx}/>
    </td><td><input type="month" name="duration_to" value={formatDate(el.duration_to,'wTon')} disabled={editDetails} onChange={handleChange} id={idx}/>

    </td>
    </tr>)}</tbody></table></div>
       
</div>
  )
}
