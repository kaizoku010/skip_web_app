import AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute  } from 'amazon-cognito-identity-js';

AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: 'AKIAQ3EGP2YO547O7LHI',
  secretAccessKey: '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'
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient(
   { region: 'ap-south-1', 
    accessKeyId: 'AKIAQ3EGP2YO547O7LHI',
    secretAccessKey: 'PRWALHllhow8mVBdUN/0Y3/Mo6q0eTx8RihBE0ke'
    
});


const userPool = new CognitoUserPool({
  UserPoolId: 'ap-south-1_YRFnyDxCR', // Replace with your actual User Pool ID
  ClientId: '714k6vrn207tf567haia6ljvpg'
});

export { s3, dynamoDB, CognitoUserPool,userPool, CognitoUserAttribute };
