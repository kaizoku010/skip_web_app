import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: 'AKIAQ3EGP2YO2YJS6E6K',
  secretAccessKey: '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'
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient(
   { region: 'us-east-1', 
    accessKeyId: 'AKIAQ3EGP2YO547O7LHI',
    secretAccessKey: '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'
    
});

export { s3, dynamoDB };
