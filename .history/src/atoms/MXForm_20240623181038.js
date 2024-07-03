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
    const password = uuidv4().substring(0, 8);

    const attributeList = [
      new CognitoUserAttribute({ Name: 'name', Value: name }),
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: simu }),
      new CognitoUserAttribute({ Name: 'picture', Value: imageUrl })
    ];

    userPool.signUp(email, password, attributeList, null, async (err, result) => {
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
        password: password,
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
