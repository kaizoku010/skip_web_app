import React, { useState } from "react";
import "./MXForm.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MXForm({ price, eventName, id, type_, onRegistrationSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // Image state
  const [loading, setLoading] = useState(false); // Loading state for progress bar
  const [job, setJob] = useState("");
  const [office, setOffice] = useState("");
  const [simu, setSimu] = useState("");
  const [success, setSuccess] = useState(false);
  const [gender, setGender] = useState("");
  const [industry, setIndustry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const industries = [
    "Technology", "Healthcare", "Finance", "Retail", "Manufacturing", 
    "Construction", "Transportation", "Government", "Agriculture", 
    "Real Estate", "Education", "Restaurants", "Casinos", 
    "Advertising & Marketing", "Sports", "Security", "Travel"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setErrorMessage("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", simu); // Use simu as password here (or replace it with the correct field)
    formData.append("userImage", image); // Add image to FormData

    try {
      setLoading(true); // Start the loading process

      const response = await axios.post('https://skip-api-1gup.onrender.com//auth/signup', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false); // Stop loading when done

      if (response.status === 201) {
        setSuccess(true); // Account creation successful
        onRegistrationSuccess && onRegistrationSuccess(); // Trigger any success callback
        navigate("/some-success-route"); // Navigate to a success page or any route
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setLoading(false); // Stop loading if there's an error
      setErrorMessage(error.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="form-holder" style={{ display: "flex" }}>
      <div className="div-1">
        <div className="login-holder flex-form">
          <div className="well">
            <form onSubmit={handleSubmit} className="material-form" encType="multipart/form-data">
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
                    value={simu}
                    onChange={(e) => setSimu(e.target.value)}
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
                  placeholder="Company"
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  required
                />
              </div>
              <div className="nice-form-group">
                <input
                  type="text"
                  placeholder="Position"
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
                  <option value="" disabled>Select Gender</option>
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
                  <option value="" disabled>Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nice-form-group">
                <label className="sub-title">Add Profile Image</label>
                <input
                  className="img-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])} // Set the image on file input
                  required
                />
              </div>
              
              {type_ === "Paid" ? (
                <div className="flutterwave-div">
                  {/* Handle paid form logic */}
                </div>
              ) : (
                <button type="submit" className="btn-">
                  Submit
                </button>
              )}

              {loading && (
                <div className="progress-bar">
                  <div className="spinner"></div>
                  <p>Please wait, creating your account...</p>
                </div>
              )}

              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MXForm;
