/*
 * This is a utility file to help invoke and debug the lambda function. It is not included as part of the
 * bundle upload to Lambda.
 *
 * Credentials:
 *  The AWS SDK for Node.js will look for credentials first in the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY and then
 *  fall back to the shared credentials file. For further information about credentials read the AWS SDK for Node.js documentation
 *  http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_the_Shared_Credentials_File_____aws_credentials_
 *
 */

const fs = require('fs'),
    handler = require('./index'),
    event = {};


// handler[(process.env['COMMAND_TO_RUN'] || 'test')]()
try{
    console.log('handler() :', handler);

} catch (err) {
    console.error(err)
}
