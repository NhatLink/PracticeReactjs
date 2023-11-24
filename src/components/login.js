import { useState } from "react";
import { loginAPi } from "../service/UserService";
import { toast } from "react-toastify";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showloading, setShowLoading] = useState(false);
  const nagative = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      nagative("/");
    }
  });
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("email and password required...");
      return;
    }
    setShowLoading(true);
    let res = await loginAPi(email, password);
    console.log("check res: ", res);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      nagative("/");
      toast.success(`login user ${email} success!!!`);
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setShowLoading(false);
  };
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or userName eve.holt@reqres.in</div>
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
          onClick={() => handleLogin()}
        >
          {showloading && <i class="fa-solid fa-spinner fa-spin-pulse"></i>}
          &nbsp;Login
        </button>
        <div className="back">Go back</div>
      </div>
    </>
  );
};
export default Login;
