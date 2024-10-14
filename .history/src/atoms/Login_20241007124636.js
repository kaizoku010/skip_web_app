import React, { useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/ll2.gif"
function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState("");
    const [office, setOffice] = useState("");
    const [simu, setSimu] = useState("");
    const [success, setSuccess] = useState(false);
    const [newcode, setNewCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState("");
    const [gender, setGender] = useState("");
    const [industry, setIndustry] = useState("");
    const navigate = useNavigate();
    const [savedType, setSavedType] = useState();
  


  return (
    <div className="form-holder" style={{ display: "flex" }}>
    <div className="div-1">
      <div className="login-holder flex-form">
        <div className="well">
          <form onSubmit={(e) => e.preventDefault()} className="material-form">
            <div className="flexMeForm">
        <img c src={Logo}/>
        
              <div className="nice-form-group enlarge">
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  className='login_email_input'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="nice-form-group">
              <input
                type="text"
                placeholder="Password"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                required
              />
            </div>
                  <div className="flutterwave-div">
                    {/* <FlutterWaveButton
                      {...openPayments}
                      disabled={!isFormValid}
                    /> */}
                  </div>
                  <button type="submit"      

                  className="btn-">
                    Login
                  </button>
                            <p className='or'>OR</p>

            <div className='create_account_area' style={{display:"flex", alignItems:"center"}}>
            <Link className='create_ac_link' to="/">
                Create account here 
                </Link>
                </div>
               

                  <div style={{marginTop:"5%"}} className="progress-bar">
                    <div className="spinner"></div>
                    <p>Please wait...</p>
                  </div>
          </form>
        </div>
      </div>
    </div>
</div>  )
}

export default Login