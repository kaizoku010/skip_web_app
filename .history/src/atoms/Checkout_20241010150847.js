import React, { useState } from 'react';
import './Checkout.css'; // Import the CSS file for styling

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
        {/* <div className="form-section">
          <h2>Shipping Information</h2>
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ZIP Code:
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </label>
        </div> */}

        <div className="form-section">
          <h2 >Payment Information</h2>
          <label>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
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
          <label>
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

        <button type="submit" className="checkout-button">Complete Checkout</button>
      </form>
    </div>
  );
}

export default Checkout;
