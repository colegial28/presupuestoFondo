import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'
import axios from '../utils/axios'
import EtriesTable from '../components/EtriesTable'
import { useEntries } from '../context/EntriesContext'

export default function BudgetEntry() {
    const { user } = useAuth()
    const { fetchBudgetEntries } = useEntries()

    const [categories, setCategories] = useState([])
    const [agencies, setAgencies] = useState([])
    const [budgetInformations, setBudgetInformations] = useState([])

    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: user?.name
    })

    const fetchData = async () => {
        try {
            const categoriesRes = await axios.get('/categories')
            const budgetInfoRes = await axios.get('/budgetInformations')

            setCategories(categoriesRes.data)
            setBudgetInformations(budgetInfoRes.data)

            setFormData(prev => ({ ...prev, category: categoriesRes.data[0]?.id }))
        } catch (err) {

        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        const fetchAgencies = async () => {
            if (user?.type === 'normal') return

            try {
                const agenciesRes = await axios.get('/agencies')

                setAgencies(agenciesRes.data)
                setFormData(prev => ({ ...prev, agency: agenciesRes.data[0]?.id }))
            } catch (err) {

            }
        }

        fetchAgencies()
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('/createBudgetEntry', formData)

            if (res.status === 201) {
                setErrors([])
                await fetchBudgetEntries()

                Swal.fire({
                    title: "Good Job!",
                    text: "New budget entry has been created",
                    icon: "success"
                })
            }

        } catch (err) {
            setErrors(err.response.data?.errors)
        }
    }

    const hasError = (name) => {
        return errors?.find(e => e.param === name)?.msg
    }

    const handleFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }


    return (
        <Container>
            {
                user?.type === 'normal' && <h1 className='pt-5'>{user?.Agency?.name}</h1>
            }
            <Row className='my-5'>
                <Col lg={6}>
                    <h3 className='mb-3'>Budget</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Last Year</th>
                                <th>New Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                budgetInformations?.map((bi, i) => (
                                    <tr key={i}>
                                        <td>
                                            <b>{bi.category}</b>
                                        </td>
                                        <td>{bi.lastYearExpenses}</td>
                                        <td>{bi.newBudget}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col lg={6}>
                    <h3 className='mb-3'>Create new budget entry</h3>

                    <Form onSubmit={handleSubmit} className='budgetentry_form'>
                        <Form.Group className='d-flex flex-wrap flex-md-nowrap mb-3'>
                            <Form.Label>Name</Form.Label>
                            <div className='w-100'>
                                <Form.Control isInvalid={hasError("name")} name='name' placeholder='Name' value={formData.name} onChange={handleFormData} />
                                <span className='error'>{hasError("name")}</span>
                            </div>
                        </Form.Group>

                        <Form.Group className='d-flex flex-wrap flex-md-nowrap mb-3'>
                            <Form.Label>Category</Form.Label>
                            <div className='w-100'>
                                <Form.Select isInvalid={hasError("category")} value={formData.category} name='category' onChange={handleFormData}>
                                    {
                                        categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
                                    }
                                </Form.Select>
                                <span className='error'>{hasError("category")}</span>
                            </div>
                        </Form.Group>

                        {
                            user?.type === 'director' && (
                                <Form.Group className='d-flex flex-wrap flex-md-nowrap mb-3'>
                                    <Form.Label>Agencies</Form.Label>
                                    <div className='w-100'>
                                        <Form.Select isInvalid={hasError("agency")} value={formData.agency} name='agency' onChange={handleFormData}>
                                            {
                                                agencies.map(ag => <option key={ag.id} value={ag.id}>{ag.name}</option>)
                                            }
                                        </Form.Select>
                                        <span className='error'>{hasError("agency")}</span>
                                    </div>
                                </Form.Group>
                            )
                        }


                        <Form.Group className='d-flex flex-wrap flex-md-nowrap mb-3'>
                            <Form.Label>Description</Form.Label>
                            <div className='w-100'>
                                <Form.Control isInvalid={hasError("description")} as='textarea' rows={4} name='description' onChange={handleFormData} />
                                <span className='error'>{hasError("description")}</span>
                            </div>
                        </Form.Group>

                        <Form.Group className='d-flex flex-wrap flex-md-nowrap mb-3'>
                            <Form.Label>Amount</Form.Label>
                            <div className='w-100'>
                                <Form.Control type='number' isInvalid={hasError("amount")} name='amount' placeholder='Amount' onChange={handleFormData} />
                                <span className='error'>{hasError("amount")}</span>
                            </div>
                        </Form.Group>

                        <Button type='submit' variant='dark' className='w-100'>Create</Button>
                    </Form>
                </Col>
            </Row>

            <EtriesTable fetchData={fetchData} />
        </Container>
    )
}
