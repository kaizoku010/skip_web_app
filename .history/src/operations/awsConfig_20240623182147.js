import AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute  } from 'amazon-cognito-identity-js';

AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: 'AKIAQ3EGP2YO547O7LHI',
  secretAccessKey: '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'
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient(
   { region: 'us-east-1', 
    accessKeyId: 'AKIAQ3EGP2YO547O7LHI',
    secretAccessKey: 'PRWALHllhow8mVBdUN/0Y3/Mo6q0eTx8RihBE0ke'
    
});


const userPool = new CognitoUserPool({
  UserPoolId: 'ap-south-1_6jIR5VY7P', // Replace with your actual User Pool ID
  ClientId: '4tmfcf82j5s38f6jgkh6qik7v'
});

export { s3, dynamoDB, CognitoUserPool,userPool, CognitoUserAttribute };
