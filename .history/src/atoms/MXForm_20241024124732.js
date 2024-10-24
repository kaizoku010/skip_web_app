import React, { useState } from "react";
import "./MXForm.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./regesiter.css"

function MXForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState("");
  const [industry, setIndustry] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");


  const navigate = useNavigate();

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Construction",
    "Transportation",
    "Government",
    "Agriculture",
    "Real Estate",
    "Education",
    "Restaurants",
    "Casinos",
    "Advertising & Marketing",
    "Sports",
    "Security",
    "Travel",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("user data: ", password)

    try {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("email", email);
      formData.append("job", job);
      formData.append("userImage", age);
      formData.append("jobT", position);
      formData.append("password", password);
      formData.append("phone", phoneNumber);
      formData.append("gender", gender);
      formData.append("industry", industry);
      formData.append("userImage", image);

      const response = await axios.post('https://skip-api-1gup.onrender.com/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      if (response.status === 201) {
        setLoading(false);
        setSuccess(true); // Show success message and hide form
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred during registration");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="form-holder" style={{ display: "flex" }}>
      <div className="div-1">
        <div className="login-holder flex-form">
          <div className="well">
            {/* Conditionally render form or success message */}
            {!success ? (
              <form onSubmit={handleSubmit} className="material-form">
                   {loading && (
                  <div className="progress-bar">
                    <div className="spinner"></div>
                    <p>Please wait...</p>
                  </div>
                )}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="flexMeForm">
                  <div className="nice-form-group enlarge">
                    <input
                      type="text"
                      placeholder="Full Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="nice-form-group enlarge">
                    <input
                      type="tel"
                      placeholder="+256....."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
                <div className="nice-form-group">
                  <input
                    type="text"
                    placeholder="Company"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    required
                  />
                </div>
                <div className="nice-form-group">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div id="groupd" className="nice-form-group">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Industry
                    </option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="nice-form-group">
                  <label className="sub-title"> Add Profile Image</label>
                  <input
                    className="img-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>

             
              </form>
            ) : (
              <div className="success-message">
                <h2>Registration Successful!</h2>
                <p>Thank you for registering. Proceed to Login your sk!p account.</p>
                <Link to="/login" className="login-btn">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MXForm;
