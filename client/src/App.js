import React from 'react'
import Dashboard from './Components/Dashboard';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter or MemoryRouter

import LoginForm from './Components/Login';

export default function App() {
  return (
    <div className='App'>
      <Router> {/* Wrap Routes with BrowserRouter or MemoryRouter */}
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}
