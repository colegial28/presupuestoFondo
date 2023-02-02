import React, { useContext, useState, useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../utils/axios'


const AuthContext = React.createContext(null)


export default function AuthProvider({ children }) {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])
    const [msg, setmsg] = useState(null)
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [refetch, setRefetch] = useState(false)

    const location = useLocation()

    useLayoutEffect(() => {
        const AuthUser = async () => {
            try {
                const { data } = await axios.get('/auth')
                setUser(data)
            } catch (err) {

            }

            setLoaded(true)
        }

        if (localStorage.getItem('token')) {
            AuthUser()
        }
        else {
            setLoaded(true)
        }
    }, [])

    useEffect(() => {
        setErrors([])
        setmsg(null)

    }, [location])

    const handleFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const hasError = (name) => {
        return errors?.find(e => e.param === name)?.msg
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/auth/login', formData)
            localStorage.setItem('token', data.token)
            setErrors([])
            setmsg(null)
            window.location.reload()

        } catch (err) {
            setErrors(err.response.data?.errors)
            setmsg(err.response.data?.msg)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/auth/register', formData)
            localStorage.setItem('token', data.token)
            setErrors([])
            setmsg(null)
            window.location.reload()

        } catch (err) {
            setErrors(err.response.data?.errors)
            setmsg(err.response.data?.msg)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <AuthContext.Provider value={{ user, loaded, handleLogin, handleRegister, logout, handleFormData, formData, hasError, errors, setErrors, msg, refetch, setRefetch }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)