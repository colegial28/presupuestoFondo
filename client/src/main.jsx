import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext';
import EntriesProvider from './context/EntriesContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EntriesProvider>
          <App />
        </EntriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
