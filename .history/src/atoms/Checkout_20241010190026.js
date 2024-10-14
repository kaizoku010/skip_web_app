import React, { useContext, useEffect, useState } from "react";
import './Checkout.css'; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";

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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const user_Id = user?.userId;
  const userName = user?.userName;
  const phoneNumber = user?.phone;
  const email = user?.userEmail;
  const jobIndustry = user?.job;
  const userimage = user?.userImage

  console.log("User ID:", user_Id)

  // Function to handle event signup
  const handleEventSignup = async () => {
    if (!user) {
      alert('Please log in to sign up for this event.');
      navigate('/login'); // Redirect to login if the user is not logged in
      return;
    }

    try {
      const response = await axios.post(`https://skip-api-1gup.onrender.com/create_attendee/${eventId}`,{
        user_Id,
        userName,
        phoneNumber,
        email,
        jobIndustry,
        userimage
      },);
      alert(response.data.message);
      navigate('/dash'); 
    } catch (error) {
      alert('Error signing up for event, please try again', error);
      console.error('Signup error:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventPrice == 0) {
      handleEventSignup();
    } else {
      alert(`Checkout successful for ${formData.cardNumber}!`);
      console.log(formData);
    }
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
