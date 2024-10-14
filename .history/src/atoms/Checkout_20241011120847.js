import React, { useContext, useEffect, useState } from "react";
import './Checkout.css'; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import spinner component


function Checkout({eventPrice, eventId}) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const { user, checkout_status, checkoutJob, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle event signup
 const handleSubmit = async (e) => {
    e.preventDefault();

  if (!user) {
    alert('Please log in to sign up for this event.');
    navigate('/login'); // Redirect to login if the user is not logged in
    return;
  }
  
  setLoading(true); // Show spinner

  try {
    await checkoutJob(eventId); // Ensure checkoutJob is awaited
    if (checkout_status) {
      alert('Signup successful!');
      navigate('/dash'); // Redirect on success
    } else {
      alert('Signup failed, please try again.');
    }
  } catch (error) {
    alert('Error signing up for event, please try again', error);
    console.error('Signup error:', error);
  } finally {
    setLoading(false); // Hide spinner
  }
};


  return (
    <div className="checkout-container">
      <h1 className='chckout-title'>Checkout AS</h1>
      <p style={{color:"blue", marginBottom:"0px", fontSize:"small"}}>{user?.userName || "please login or create account to proceed"}</p>
      <p style={{color:"lightblue", marginBottom:"0px", fontSize:"small"}}>{user?.userEmail || "-/"}</p>
      <p style={{color:"lightblue",  fontSize:"small"}}>{user?.phone || "-/"}</p>

      {loading
       && (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p>Processing your request...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h2 className='chckout-title-payment'>Payment Information</h2>
          <label className='pay-lable'>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label className='pay-lable'>
            Expiration Date:
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </label>
          <label className='pay-lable'>
            CVV:
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="checkout-button">Complete Payment</button>
       <Link className='cancle-links' to="/">
       <button  className="cancel-btn">Back Home</button>

       </Link>

      </form>
    </div>
  );
}

export default Checkout;
