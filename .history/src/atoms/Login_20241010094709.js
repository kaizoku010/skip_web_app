import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/ll2.gif";
import { AuthContext } from "../logic/AuthContext";
import { Checkbox } from "antd";
import type { CheckboxProps } from 'antd';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false); // State to handle remember me checkbox

  const handleLogin = async (e) => {
    e.preventDefault();
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
      // If login is successful, navigate to dashboard
      navigate("/dash");
    } else {
      alert("Invalid email or password"); // Show an error message if login fails
    }
  };

  return (
    <div
      className="form-holder"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <img className="skip_logo" src={Logo} />

      <div className="div-1">
        <div className="login-holder flex-form">
          <div className="well">
            <form onSubmit={handleLogin} className="material-form">
              <div className="flexMeForm">
                <div className="nice-form-group enlarge">
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    className="login_email_input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="nice-form-group">
                <input
                  className="login_email_input"
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="remember-me-group ">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>

              <div className="flutterwave-div"></div>
              <button type="submit" className="login_btn">
                Login
              </button>
              <p className="or">OR</p>

              <div
                className="create_account_area"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link className="create_ac_link" to="/register">
                  Create account here
                </Link>
              </div>

              {loading && (
                <div style={{ marginTop: "5%" }} className="progress-bar">
                  <div className="spinner"></div>
                  <p>Please wait...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
