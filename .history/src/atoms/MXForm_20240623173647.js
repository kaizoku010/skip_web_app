import React, { useEffect, useState, useContext } from "react";
import "./MXForm.css";
import { s3, dynamoDB, userPool, CognitoUserAttribute } from "../operations/awsConfig";
import { v4 as uuidv4 } from "uuid";
import EventsContext from "../logic/DataPoint";
import { Link, useNavigate } from "react-router-dom";


function MXForm({ id, onRegistrationSuccess }) {
  const navigate = useNavigate();
  const { events, error } = useContext(EventsContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newImage, setNewImage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState("");
  const [office, setOffice] = useState("");
  const [newUserId, setRegisteredId] = useState("");
  const [simu, setSimu] = useState("");
  const [passcode, setPassCode] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToS3 = async (imageFile, fileName) => {
    const params = {
      Bucket: 'moxieeventsbucket',
      Key: `images/${fileName}`,
      Body: imageFile,
      ContentType: imageFile.type
    };
    try {
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !simu || !job || !office || !image) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const imageFileName = `${uuidv4()}-${image.name}`;
      const imageUrl = await uploadImageToS3(image, imageFileName);
      const newcode = uuidv4().substring(0, 6);

      const attributeList = [
        new CognitoUserAttribute({ Name: 'name', Value: name }),
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({ Name: 'phone_number', Value: simu }),
        new CognitoUserAttribute({ Name: 'picture', Value: imageUrl })
      ];

      userPool.signUp(email, newcode, attributeList, null, async (err, result) => {
        if (err) {
          console.error('Error signing up:', err.message);
          setLoading(false);
          alert(err.message);
          return;
        }
        const cognitoUser = result.user;

        const formData = {
          name: name,
          occupation: job,
          email: email,
          office: office,
          image: imageUrl,
          password: newcode,
          selectedEvent: id,
          phonenumber: simu,
          uid: cognitoUser.getUsername()
        };

        const params = {
          TableName: 'attendees',
          Item: formData
        };

        try {
          await dynamoDB.put(params).promise();
          setSuccess(true);
          onRegistrationSuccess();
        } catch (error) {
          console.error('Error adding user to DynamoDB:', error.message);
          alert('An error occurred while adding the event. Please try again.');
        } finally {
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error signing up:', error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Password copied to clipboard");
    });
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
                      placeholder="Phone Number"
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
                <button type="submit" className="btn-">
                  Submit
                </button>
                <Link to="/">
                  <button type="button" className="btn-">
                    Close
                  </button>
                </Link>
                {loading && <div className="progress-bar">please wait...</div>}
              </form>
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
          <p>
            <strong>Password:</strong> {passcode}{" "}
            <button
              className="copy-pass"
              onClick={() => copyToClipboard(passcode)}
            >
              Copy Password
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default MXForm;