import { Persons } from './Persons'
import { PersonForm } from './PersonForm'
import { usePersons } from './persons/customHooks'
import { useState } from 'react'
import Notify from './Notify'
import { PhoneForm } from './PhoneForm'
import LoginForm from './LoginForm'
import { useApolloClient } from '@apollo/client'

function App() {
  const { data, error, loading } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-user-token'))
  const client = useApolloClient()

  if (error) return <span style={{ color: 'red' }}>Error: {error.message}</span>

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className='container'>
      <Notify errorMessage={errorMessage} />
      {loading ?
        <p>Loading...</p>
        : (
          <Persons persons={data?.allPersons} />
        )}
        {token 
          ? <button onClick={logout}>Logout</button>
          : <LoginForm notifyError={notifyError} setToken={setToken} />
        }
        <PersonForm notifyError={notifyError} />
        <PhoneForm />
    </div>
  )
}

export default App
