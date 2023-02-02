import React from 'react'
import { useEffect } from 'react'
import { Badge, Table } from 'react-bootstrap'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiXMark } from 'react-icons/hi2'
import { useAuth } from '../context/AuthContext'
import { useEntries } from '../context/EntriesContext'


export default function Director({ fetchData }) {
  const { user } = useAuth()
  const { budgetEntries, takeAction, setActionTook, actionTook } = useEntries()

  useEffect(() => {
    if (actionTook) {
      fetchData()
      setActionTook(false)
    }

  }, [actionTook])

  return (
    <div>
      <Table responsive striped className='border shadow-sm director_table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            {
              user?.type === 'director' && <th>Agency</th>
            }
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            {
              user?.type === 'director' && <th>Actions</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            budgetEntries?.map(be => (
              <tr key={be.id}>
                <td>{be.name}</td>
                <td>{be.category?.name}</td>
                {
                  user?.type === 'director' && <td>{be.Agency?.name}</td>
                }
                <td style={{ maxWidth: "15rem" }}>{be.description}</td>
                <td>{be.amount}</td>
                <td>
                  <Badge style={{ width: "5rem", textTransform: "capitalize" }} bg={(be.status === 'approved') ? 'success' : (be.status === 'pending') ? 'warning' : (be.status === 'denied') && 'danger'}>{be.status}</Badge>
                </td>
                <td>
                  {
                    user?.type === 'director' && be.status === 'pending' && (
                      <div className='d-flex gap-2'>
                        <button onClick={() => takeAction(be.id, 'approved')} className='btn btn-sm'>
                          <AiOutlineCheck size={20} color='green' />
                        </button>
                        <button className='btn btn-sm' onClick={() => takeAction(be.id, 'denied')}>
                          <HiXMark size={20} color='red' />
                        </button>
                      </div>
                    )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      {
        !budgetEntries.length && <p>No pending entries yet</p>
      }
    </div >
  )
}