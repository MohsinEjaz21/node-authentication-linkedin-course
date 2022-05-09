import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "src/helpers/axios";
import { PATH } from "src/routes/backend/paths";

export default function ForgetPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post({
      url: PATH.auth.forgetPassword, data: { email }
    })
    if (response.status === 200) {
      setSuccess(true);
    } else {
      setError("An error occured and we couldn't send you a reset link");
    }
  }


  return (
    success ? (
      <div className="content-container">
        <h1>Success</h1>
        <p>Check your email for reset link</p>
      </div>
    ) : (
      <div className="content-container">
        <h1>Forgot Password</h1>
        <p>Enter your email and we'll send you reset link</p>
        {error && <p className="fail">{error}</p>}  
        <input type="email" onChange={e => setEmail(e.target.value)}
          placeholder="someone@gmail.com" />

        <button onClick={handleSubmit} disabled={!email} >
          Send Reset Link
        </button>
      </div>
    )
  )
}