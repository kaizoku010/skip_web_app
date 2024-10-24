import React, { useState } from 'react';
import "./EventForm.css";
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Quotes from "./Quotes.js";
import MXForm from './MXForm';

function Register() {
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  return (
    <div className='evt-form'>
      <div className='inner-form'>
        {/* Conditionally render success message */}
        {isRegistrationSuccessful && (
          <div className='show-me-we-are-good'>Registration was successful!</div>
        )}

        {/* Form Side */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className='create_mobile' style={{ textAlign: "left", paddingLeft: "2rem" }}>
            <Link to="/">
              <p className='backhme'><span><ArrowLeftOutlined style={{ marginRight: ".5rem" }} /></span>Back Home</p>
            </Link>
            <h3>Create Account </h3>
            <p>Start by providing a few details about yourself and a profile image</p>
          </div>
          <div className='form-side'>
            <div className='form-side-holder'>
              <MXForm />
            </div>
          </div>
        </div>
      </div>

      {/* Quotes Side */}
      <div className='form-left-side register_page'>
        <div className='spacer'>
          <Link to="/">
            <p className='backhme2'><span><ArrowLeftOutlined style={{ marginRight: ".5rem" }} /></span>Back Home</p>
          </Link>
        </div>
        <div className='qoutes_layout'>
          <Quotes />
        </div>
      </div>
    </div>
  );
}

export default Register;
