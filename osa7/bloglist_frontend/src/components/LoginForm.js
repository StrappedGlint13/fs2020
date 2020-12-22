import React, { useState, } from 'react'
import { Input, Page } from './Styled-Components'
import  Error  from './Error.js.js'
import { Button } from './Styled-Components'
import { useDispatch } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'
import  { setNotification }  from '../reducers/notiReducer'


const LoginForm = () =>  {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setLogin({ username, password }))
    dispatch(setNotification(`Welcome ${username}`, 5))
  }

  return (
    <Page>
      <div>
        <Error />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <Input
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <Input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id="login-button" type="submit">login</Button>
        </form>
      </div>
    </Page>
  )
}

export default LoginForm

