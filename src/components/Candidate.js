import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import ListScreen from "./ListScreen";
import Form from "./Form";
import { useParams, useLocation,Routes,Route } from "react-router-dom";
import { cloneDeep } from "../utils/helper";
export default function Candidate() {
  const {
    candidateList,
    setCandidateList } = useAuth();

  useEffect(() => {
    const getData = () => {
      axios
        .get(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate`)
        .then((res) => {
          if (res.status === 200 && res.statusText === "OK") {
            setCandidateList(res.data);
          } else {
            alert("Something went wrong...");
            console.log(res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getData();
  }, []);
  

  return (
    <div>
      <main id="homeContainer">
        <section>
          <ListScreen />
        </section>
        <section>
          {candidateList.length?
          <Routes>
          <Route exact path="new" element={<Form />}/>
          <Route path=":id" element={<Form />}/>
          </Routes>:null}
        </section>
      </main>
    </div>
  );
}
