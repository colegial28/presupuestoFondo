import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { useAuth } from './context/AuthContext'
import BudgetEntry from './pages/BudgetEntry'
import Login from './pages/login'
import Register from './pages/register'

export default function App() {
  const { user, loaded } = useAuth()

  if (!loaded) return

  return (
    <React.Fragment>
      <Header />
      <Routes>
        {
          user?.name ? (
            <>
              <Route path='/' element={<BudgetEntry />} />
              <Route path='*' element={<BudgetEntry />} />
            </>
          )
            :
            (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<Login />} />
              </>
            )
        }
      </Routes>
    </React.Fragment>
  )
}
