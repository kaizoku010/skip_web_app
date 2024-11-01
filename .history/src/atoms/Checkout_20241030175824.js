import React, { useContext, useState } from "react";
import './Checkout.css'; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../logic/AuthContext";
import { ClipLoader } from "react-spinners"; // Import spinner component
import Payments from "./Payments";

function Checkout({ eventPrice, eventId }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const { error,user, checkoutJob } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to control spinner visibility
  const [success, setSuccess] = useState(false); // State to track success

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle event signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!user) {
    //   alert('Please log in to sign up for this event.');
    //   navigate('/login'); // Redirect to login if the user is not logged in
    //   return;
    // }

    setLoading(true); // Show spinner

    try {
      const status = await checkoutJob(eventId); // Ensure the correct value is returned
      if (status) {
        setSuccess(true); // Show success message and hide form
        setTimeout(() => {
          navigate('/dash'); // Redirect to dashboard after 2 seconds
        }, 2000);
console.log("message: ","works")

      } else{
        alert('Error creating event ticket, please try again.', error);
        
      }
    } catch (error) {
      alert('Error signing up for event, please try again.', error);
      console.error('create event signup error:', error); // Log the error for debugging
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout As</h1>
      <p style={{ color: "blue", marginBottom: "0px", fontSize: "small" }}>
        {user?.userName || "Please log in or create an account to proceed"}
      </p>
      <p style={{ color: "lightblue", marginBottom: "0px", fontSize: "small" }}>
        {user?.userEmail || "-/"}
      </p>
      <p style={{ color: "lightblue", fontSize: "small" }}>
        {user?.phone || "-/"}
      </p>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p>Processing your request...</p>
          </div>
        </div>
      )}

      {success ? (
        <div className="success-message">
          <h2>Payment Complete!</h2>
          <p>Thank you for signing up! You will be redirected shortly.</p>
          <Link className="cancel-links" to="/">
            <button className="cancel-btn">Back Home</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          {/* <div className="form-section">
            <h2 className="checkout-title-payment">Payment Information</h2>
            <label className="pay-label">
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label className="pay-label">
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
            <label className="pay-label">
              CVV:
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </label>
          </div> */}
{/* 
          <button type="submit" className="checkout-button">
            Complete Payment
          </button> */}

          <Payments  />
          <Link className="cancel-links" to="/">
            <button className="cancel-btn">Back Home</button>
          </Link>
        </form>
      )}
    </div>
  );
}

export default Checkout;
