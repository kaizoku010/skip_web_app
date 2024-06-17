import React from 'react';
import './Login.css';

function EventSignUp() {
  return (
    <div className="login-holder">
      <div className="well">
        <div className="logo-holder-login">
          <img className="login-logo" src="https://lampeire.com/wp-content/uploads/2023/08/NewlampeireLogo-1-300x88.png" alt="Logo" />
        </div>
        <form className="material-form">
          <div className="form-group">
            <input type="email" className="form-control" />
            <label>Email</label>
            <span className="input-border"></span>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" />
            <label>Password</label>
            <span className="input-border"></span>
          </div>
          <a href="/dashboard">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          </a>
          <p className="helper-text">Don't have an account? <a href="#">Contact Support</a> here.</p>
        </form>
      </div>
    </div>
  );
}

export default EventSignUp;
