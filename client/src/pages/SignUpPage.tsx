import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "src/auth/useToken";
import axios from "src/helpers/axios";
import { PATH } from '../routes/backend/paths';

const SignUpPage = () => {
  const [email, setEmail] = useState("mejaz17821@mailinator.com");
  const [password, setPassword] = useState("1234");
  const [confirmPassword, setConfirmPassword] = useState("1234");
  const { setToken } = useToken()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("");

  console.log("PATH 🌈", PATH.auth.signUp)



  const handleSubmit = async () => {
    // alert('Login with email: ' + email + ' and password: ' + password);
    const response = await axios.post({
      url: PATH.auth.signUp, data: { email, password, confirmPassword }
    })
    const { token } = response.data
    setToken(token)
    navigate('/profile')
  }

  return (
    <div className="content-container">
      <h1>Signup</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}

      <input type="text" placeholder="someone@gmail.com"
        value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="password"
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <input type="password" placeholder="ConfirmPassword"
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <hr />

      <button disabled={!email || !password || password !== confirmPassword} onClick={handleSubmit} >Sign Up</button>
      <button onClick={() => navigate('/login')}> Already Have a account ? Login</button>
    </div>
  )
}

export default SignUpPage