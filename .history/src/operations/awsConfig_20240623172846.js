import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

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
  UserPoolId: 'us-east-1_ExaMPle', // Replace with your actual User Pool ID
  ClientId: '1h57kf5cpq17m0eml12EXAMPLE' // Replace with your actual App Client ID
});

export { s3, dynamoDB };
