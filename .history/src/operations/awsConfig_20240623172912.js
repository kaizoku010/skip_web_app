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
  UserPoolId: 'ap-south-1_dkQE0q125', // Replace with your actual User Pool ID
  ClientId: '1rt84kg5g8c921g24imd5mdd0t' // Replace with your actual App Client ID
});

export { s3, dynamoDB };
