import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundry';
import LogIn from './LogIn';
import { ProtectedRoute } from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import Home from './Home';
import Candidate from './Candidate';

export default function HandleRoutes() {
  return (
    <ErrorBoundary>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* public routes */}
        <Route path="/login" element={<LogIn />} />

        {/* private routes */}
        <Route  element={<ProtectedRoute />} >
          
        <Route path="/candidate/*" element={<Candidate />} />
        
        </Route>
        {/* catch all other*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
        
         </ErrorBoundary>
  )
}
