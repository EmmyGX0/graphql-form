import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "./login/graphql-queries"

const LoginForm = ({ notifyError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Login Form</h2>
      <form 
        style={{ 
          display: 'flex', 
          gap: '5px', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
          }} 
          onSubmit={handleSubmit}
        >
        <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginForm