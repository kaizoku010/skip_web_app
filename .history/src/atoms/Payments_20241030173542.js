import React, { useEffect } from 'react';

function Payments({price, eventName, customerEmail, customerContact, customerName }) {
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
        email: `${cus}`,
        phone_number: "08100000000",
        name: "Ayomide Jimi-Oni",
      },
      customizations: {
        title: "Flutterwave Developers",
        description: `Payment for ${eventName}`,
        logo: "https://skipug.app/static/media/ll2.9ffbf8c2402f76233480.gif",
      },
      callback: function (data) {
        console.log("payment callback:", data);
      },
      onclose: function() {
        console.log("Payment cancelled!");
      }
    });
  };

  return (
    <div>
      <h3>Your order is ₦2,500</h3>
      <button type="button" onClick={makePayment}>Pay Now</button>
    </div>
  );
}

export default Payments;
