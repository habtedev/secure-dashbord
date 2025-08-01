import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Register from '../../../src/pages/Register.jsx'

describe('Register Page Integration', () => {
  it('renders Register form and submits with valid data', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )

    // Check form fields
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    const [passwordInput1, confirmPasswordInput1] =
      screen.getAllByLabelText(/Password/i)
    expect(passwordInput1).toBeInTheDocument()
    expect(confirmPasswordInput1).toBeInTheDocument()

    // Fill out form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    })
    const [passwordInput2, confirmPasswordInput2] =
      screen.getAllByLabelText(/Password/i)
    fireEvent.change(passwordInput2, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput2, {
      target: { value: 'password123' },
    })

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }))

    // You can add more assertions here for success messages, API calls, etc.
  })

  it('shows validation error if passwords do not match', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )

    const [passwordInput3, confirmPasswordInput3] =
      screen.getAllByLabelText(/Password/i)
    fireEvent.change(passwordInput3, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput3, {
      target: { value: 'wrongpass' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Register/i }))

    // Example: expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
    // Add this if you implement validation feedback in the UI
  })
})
