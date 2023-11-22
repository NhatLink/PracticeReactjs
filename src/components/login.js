import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or userName</div>
        <input
          type="text"
          placeholder="username or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input2">
          <input
            type={showPassword === true ? "text" : "password"}
            placeholder="password...."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={
              showPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <div className="back">Go back</div>
      </div>
    </>
  );
};
export default Login;
