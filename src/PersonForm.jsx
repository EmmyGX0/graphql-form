import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { CREATE_PERSON } from "./persons/graphql-mutations";

export const PersonForm = ({ notifyError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS } ],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    
    createPerson({ variables: {name, phone, street, city} })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Create new Person</h2>
      <form style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} />
        <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <button>Create</button>
      </form>
    </div>
  )
}