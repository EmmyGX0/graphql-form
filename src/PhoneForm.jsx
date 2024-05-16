import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber] = useMutation(EDIT_NUMBER)

  const handleSubmit = e => {
    e.preventDefault()
    
    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Edit phone number</h2>
      <form style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <button>Change phone</button>
      </form>
    </div>
  )
}