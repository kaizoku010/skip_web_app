import React from 'react'
import "./login.css"
import "./MXForm.css";

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
          
        
              <div className="nice-form-group enlarge">
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="nice-form-group">
              <input
                type="text"
                placeholder="Company"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
</div>  )
}

export default Login