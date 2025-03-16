import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index2.css' //index1 is the original
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
