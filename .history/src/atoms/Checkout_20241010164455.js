import React, { useContext, useEffect, useState } from "react";
import './Checkout.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import { AuthContext } from "../logic/AuthContext";

function Checkout() {
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Checkout successful for ${formData.name}!`);
    console.log(formData); // Here you can process the form data as needed
  };

  return (
    <div className="checkout-container">
      <h1 className='chckout-title'>Checkout</h1>
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
