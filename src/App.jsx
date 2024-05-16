import { Persons } from './Persons'
import { PersonForm } from './PersonForm'
import { usePersons } from './persons/customHooks'
import { useState } from 'react'
import Notify from './Notify'
import { PhoneForm } from './PhoneForm'

function App() {
  const { data, error, loading } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)

  if (error) return <span style={{ color: 'red' }}>Error: {error.message}</span>

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }
  return (
    <div className='container'>
      <Notify errorMessage={errorMessage} />
      {loading ?
        <p>Loading...</p>
        : (
          <Persons persons={data?.allPersons} />
        )}
        <PersonForm notifyError={notifyError} />
        <PhoneForm />
    </div>
  )
}

export default App
