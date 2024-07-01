import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import Router from './router/Router.tsx'
import AuthProvider from './provider/AuthProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Router/>
  </AuthProvider>
)
