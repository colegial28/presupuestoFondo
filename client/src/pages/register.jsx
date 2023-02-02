import React from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { handleRegister, handleFormData, hasError, msg } = useAuth()

    return (
        <Container className='auth'>
            <Form onSubmit={handleRegister} className='border rounded shadow-sm'>
                <h2 className='mb-4'>Register</h2>
                {
                    msg && <Alert variant='danger'>{msg}</Alert>
                }
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control isInvalid={hasError("name") || msg} onChange={handleFormData} name='name' placeholder='Enter your name' />
                    <span className='error'>{hasError("name")}</span>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control isInvalid={hasError("email") || msg} onChange={handleFormData} name='email' placeholder='Enter your email' />
                    <span className='error'>{hasError("email")}</span>
                </Form.Group>
                <Form.Group className='mb-5'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control isInvalid={hasError("password") || msg} onChange={handleFormData} name='password' placeholder='Enter your password' />
                    <span className='error'>{hasError("password")}</span>
                </Form.Group>
                <Button type='submit' className='w-100' variant='dark'>Register</Button>
            </Form>
        </Container>
    )
}
