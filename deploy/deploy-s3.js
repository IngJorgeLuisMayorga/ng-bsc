const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname+'/../.env')});

const s3FolderUpload = require('s3-folder-upload')
// or the ES6 way
// import s3FolderUpload from 's3-folder-upload'

const directoryName = path.resolve(__dirname+'/../');

// I strongly recommend to save your credentials on a JSON or ENV variables, or command line args
const credentials = {
  "accessKeyId": process.env.S3_accessKeyId,
  "secretAccessKey": process.env.S3_secretAccessKey,
  "region": process.env.S3_region,
  "bucket": process.env.S3_bucket,
}

console.log(' ')
console.log(' ')
console.log(' directoryName')
console.log(directoryName)
console.log(' credentials')
console.log(credentials)
console.log(' ')
console.log(' ')

// optional options to be passed as parameter to the method
const options = {
  useFoldersForFileTypes: false,
  useIAMRoleCredentials: false
}

// optional cloudfront invalidation rule
const invalidation = {
  awsDistributionId: "<Your CloudFront Distribution Id>",
  awsInvalidationPath: "<The Path to Invalidate>"
}

s3FolderUpload(directoryName, credentials, options, {})