import React, { createContext, useEffect, useState } from 'react'
import axios from '../utils/axios'
import Swal from 'sweetalert2'
import { useContext } from 'react'


const EntriesContext = createContext(null)

export default function EntriesProvider({ children }) {
    const [budgetEntries, setBudgetEntries] = useState([])
    const [actionTook, setActionTook] = useState(false)

    const fetchBudgetEntries = async () => {
        try {
            const { data } = await axios.get('/budgetEntries')
            setBudgetEntries(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchBudgetEntries()
    }, [])


    const takeAction = async (id, status) => {
        try {
            const { data } = await axios.post(`/takeAction/${id}`, { status })
            setBudgetEntries(data)
            setActionTook(true)
            Swal.fire({
                title: "Good Job",
                text: "Entry has been " + status,
                icon: 'success'
            })
        } catch (error) {

        }
    }

    return (
        <EntriesContext.Provider value={{ budgetEntries, takeAction, fetchBudgetEntries, setActionTook, actionTook }}>
            {children}
        </EntriesContext.Provider>
    )
}


export const useEntries = () => useContext(EntriesContext)