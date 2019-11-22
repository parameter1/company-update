const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./env');

module.exports = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
