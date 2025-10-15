import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListPage from './pages/ListPage'
import SinglePage from './pages/SinglePage'
import List5odam from './pages/List5odam';
import Single5odam from './pages/Single5odam'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list-khodam" element={<List5odam />} />
        <Route path="/single/:id" element={<SinglePage />} />
        <Route path="/single-khodam/:id" element={<Single5odam />} />
      </Routes>
    </>
  )
}

export default App
