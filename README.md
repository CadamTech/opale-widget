# Opale Widget

## To install

`npm install`

## To build for development

`npx webpack --config webpack.dev.js`

## To build for production

`npx webpack --config webpack.prod.js`

## To sync to S3

`npm run sync`

## To create Cloudfront Invalidation

`npm run inv`

## enviroment files

.env.dev
.env.prod

API_URL="https://verifier-test.opale.io"
AUTHENTICATOR_URL="https://authenticator-dev.opale.io"
CSS_FRAMEWORK_URL="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css"