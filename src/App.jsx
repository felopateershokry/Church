import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListPage from './pages/ListPage'
import SinglePage from './pages/SinglePage'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:input" element={<ListPage />} />
        <Route path="/single/:id" element={<SinglePage />} />
      </Routes>
    </>
  )
}

export default App
