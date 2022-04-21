import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authSliceAction } from "src/redux/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleLoginClick = () => {
    if (email && password) {
      authSliceAction.setIsLogined(true);
      navigate('/profile');
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