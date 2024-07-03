import React, { useState } from "react";
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

function MXForm({ price, eventName, id, type, onRegistrationSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState("");
  const [office, setOffice] = useState("");
  const [simu, setSimu] = useState("");
  const [success, setSuccess] = useState(false);
  const [newcode, setNewCode] = useState(""); // State to hold newcode
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages

  console.log("eventType: ", type.toString());

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //setting up flutterwave..
  const config = {
    public_key: "FLWPUBK_TEST-5fcf603e21cc67bcaddbaca6efae6956-X",
    tx_ref: Date.now(),
    amount: price || 0,
    currency: "UGX",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email || "Kindly add your email address to proceed",
      phone_number: simu,
      name: name,
    },
    customizations: {
      title: "SK!P",
      description: `Payment ${eventName}`,
      logo: { Logo },
    },
  };

  const uploadImageToS3 = async (imageFile, fileName) => {
    const params = {
      Bucket: "moxieeventsbucket",
      Key: `images/${fileName}`,
      Body: imageFile,
      ContentType: imageFile.type,
    };
    try {
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      throw error;
    }
  };

  const signUpUser = async (email, code, attributeList) => {
    return new Promise((resolve, reject) => {
      userPool.signUp(email, code, attributeList, null, (err, result) => {
        if (err) {
          console.error("Error signing up:", err.message);
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });
  };

  const addAttendeeToDynamoDB = async (formData) => {
    const params = {
      TableName: "attendees",
      Item: formData,
    };

    try {
      await dynamoDB.put(params).promise();
    } catch (error) {
      console.error("Error adding user to DynamoDB:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !simu || !job || !office || !image) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const imageFileName = `${uuidv4()}-${image.name}`;
      const imageUrl = await uploadImageToS3(image, imageFileName);
      const code = uuidv4().substring(0, 6);

      setNewCode(code);

      const attributeList = [
        new CognitoUserAttribute({ Name: "name", Value: name }),
        new CognitoUserAttribute({ Name: "email", Value: email }),
        new CognitoUserAttribute({ Name: "phone_number", Value: simu }),
        new CognitoUserAttribute({ Name: "picture", Value: imageUrl }),
      ];

      const cognitoUser = await signUpUser(email, code, attributeList);

      const formData = {
        name: name,
        occupation: job,
        email: email,
        office: office,
        image: imageUrl,
        password: code,
        selectedEvent: id,
        phonenumber: simu,
        uid: cognitoUser.getUsername(),
        pricePaid: type === "paid" ? price : 0,
      };

      await addAttendeeToDynamoDB(formData);

      setSuccess(true);
      onRegistrationSuccess();
    } catch (error) {
      console.error("Registration Error:", error.message);
      setErrorMessage("An error occurred while processing your registration.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentCallback = async (response) => {
    console.log(response);
    if (response.status === "successful") {
      try {
        const imageFileName = `${uuidv4()}-${image.name}`;
        const imageUrl = await uploadImageToS3(image, imageFileName);
        const code = uuidv4().substring(0, 6);

        setNewCode(code);

        const attributeList = [
          new CognitoUserAttribute({ Name: "name", Value: name }),
          new CognitoUserAttribute({ Name: "email", Value: email }),
          new CognitoUserAttribute({ Name: "phone_number", Value: simu }),
          new CognitoUserAttribute({ Name: "picture", Value: imageUrl }),
        ];

        const cognitoUser = await signUpUser(email, code, attributeList);

        const formData = {
          name: name,
          occupation: job,
          email: email,
          office: office,
          image: imageUrl,
          password: code,
          selectedEvent: id,
          phonenumber: simu,
          uid: cognitoUser.getUsername(),
          pricePaid: price,
        };

        await addAttendeeToDynamoDB(formData);

        setSuccess(true);
        onRegistrationSuccess();
      } catch (error) {
        console.error("Registration Error:", error.message);
        setErrorMessage("An error occurred while processing your registration.");
      } finally {
        setLoading(false);
      }
    }
    closePaymentModal();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Password copied to clipboard");
    });
  };

  const backtoApp = () => {
    window.open("https://skipp-kaizoku010-moxie-team.vercel.app/", "_blank");
  };

  const openPayments = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: handlePaymentCallback,
    onClose: () => {},
  };

  return (
    <div className="form-holder" style={{ display: "flex" }}>
      {!success ? (
        <div className="div-1">
          <div className="login-holder flex-form">
            <div className="well">
              <form onSubmit={handleSubmit} className="material-form">
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
                  <label className="sub-title"> Add Profile Image</label>
                  <input
                    className="img-input"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </div>
                {type === "paid" ? (
                  <div className="flutterwave-div">
                    <FlutterWaveButton {...openPayments} />
                  </div>
                ) : (
                  <button type="submit" className="btn-">
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="confirmation-message">
          <h2>Registration Successful</h2>
          <p>Next Steps</p>
          <p>Take your credentials:</p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <div></div>
          <p className="btn-zero">
            <strong>Password:</strong> {newcode}{" "}
            <button
              className="copy-pass"
              onClick={() => copyToClipboard(newcode)}
            >
              <FontAwesomeIcon icon={faCopy} /> Copy Password
            </button>
            <button className="copy-pass" onClick={() => backtoApp()}>
              <FontAwesomeIcon icon={faCopy} /> Back to App
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default MXForm;
