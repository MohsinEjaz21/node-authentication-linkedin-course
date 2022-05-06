import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "src/auth/useToken";
import axios from "src/helpers/axios";
import { PATH } from '../routes/backend/paths';

const LoginPage = () => {
  const [email, setEmail] = useState("mejaz17821@mailinator.com");
  const [password, setPassword] = useState("1234");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const { token, setToken } = useToken();

  const handleLoginClick = async () => {
    if (email && password) {
      const response = await axios.post({
        url: PATH.auth.login, data: { email, password }
      })
      const { token } = response.data
      setToken(token)
      navigate('/profile')
    }
  }

  return (
    <div className="content-container">
      <h1>Login</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}

      <input type="text" placeholder="someone@gmail.com"
        value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="password"
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <hr />
      <button disabled={!email || !password} onClick={handleLoginClick} >Login</button>
      <button onClick={() => navigate('/forgot-password')} >Forgot your Password</button>
      <button onClick={() => navigate('/signup')}> Dont have account ? Sign Up</button>
    </div>
  )
}

export default LoginPage