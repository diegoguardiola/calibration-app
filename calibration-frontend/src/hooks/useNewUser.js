import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useNewUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const newUser = async (firstName, lastName, company, address, phone, email, password, role) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, company, address, phone, email, password, role })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    
  }

  return { newUser, isLoading, error }
}