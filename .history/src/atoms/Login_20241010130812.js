import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/ll2.gif";
import { AuthContext } from "../logic/AuthContext";
import { Checkbox } from "antd";
import Quotes from "./Quotes";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false); // State to handle remember me checkbox


  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dash');
    }
  }, [user, navigate]);


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
                    type="email"
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="remember-me-group ">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  {"Remember Me"}
                </Checkbox>
              </div>

              <div className="flutterwave-div"></div>
              <button type="submit" className="login_btn">
                Login
              </button>
              <p className="or">OR</p>
              <div className="remember-me-group ">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  {"By continuing, you agree to Sk Company’s Terms of Use and Privacy Policy."}
                </Checkbox>
              </div>
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
