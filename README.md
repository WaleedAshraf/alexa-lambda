# Alexa Lambda Function

This is repo is to maintain AWS Lambda function for Alexa integrations.

To push code to AWS Lambda:
- Clone this repo
- Create a file `publish.sh` file outsite the folder of this repo.
- copy / paste this script in `publish.sh`.
```
rm alexa-lambda.zip
cd alexa-lambda
zip -r ../alexa-lambda.zip *
cd .. 
aws lambda update-function-code --function-name yourFunctionName --zip-file fileb://alexa-lambda.zip
```
- Install AWS CLI on your machine.
- Login into your AWS Account and you should already have Lambda Function created in that account.
- Run "`sh publish.sh`", all changes to AWS and Lambda Function will be published.