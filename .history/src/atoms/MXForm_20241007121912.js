import React, { useEffect, useState } from "react";
import "./MXForm.css";
import {
  s3,
  dynamoDB,
  userPool,
  CognitoUserAttribute,
} from "../operations/awsConfig";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

function MXForm({ price, eventName, id, type_, onRegistrationSuccess }) {
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
    "Travel"
  ];


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
                      <option key={industry} value={industry} >
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
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </div>
                {type_ === "Paid" ? (
                  <div className="flutterwave-div">
                    <FlutterWaveButton
                      {...openPayments}
                      disabled={!isFormValid}
                    />
                  </div>
                ) : (
                  <button type="submit"      

                  className="btn-">
                    Submit
                  </button>
                )}
                <Link to="/">
                  <button type="button" className="btn-">
                    Back
                  </button>
                </Link>
                {loading && (
                  <div className="progress-bar">
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

export default MXForm;
