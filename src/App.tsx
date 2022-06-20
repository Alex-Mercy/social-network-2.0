import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuDrawer from './components/MenuDrawer'

const App = () => {
  return (
    <BrowserRouter>
      <MenuDrawer/>
    </BrowserRouter>
  )
}

export default App