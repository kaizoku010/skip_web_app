import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Payments({price, eventName, customerEmail, customerContact, customerName }) {
 
    const navigation  = useNavigate()


  useEffect(() => {
    // Load Flutterwave script
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const makePayment = () => {
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
      tx_ref: "txref-DI0NzMx13",
      amount: {price},
      currency: "UGX",
      payment_options: "card, banktransfer, ussd, mobilemoneyuganda",
      meta: {
        source: "docs-inline-test",
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: `${customerEmail}`,
        phone_number: `${customerContact}`,
        name: `${customerName}`,
      },
      customizations: {
        title: "Sk!p Payments",
        description: `Payment for ${eventName}`,
        logo: "https://skipug.app/static/media/ll2.9ffbf8c2402f76233480.gif",
      },
      callback: function (data) {
        console.log("payment callback:", data);
        navigation("/dash")
        
        
      },
      onclose: function() {
        console.log("Payment cancelled!");
      }
    });
  };

  return (
    <div>
      <h3>{`Payment For ${eventName} for ${price}`}</h3>
      <button type="button" onClick={makePayment}>Proceed To Checkout</button>
    </div>
  );
}

export default Payments;
