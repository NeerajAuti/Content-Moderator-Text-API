require('dotenv').config();
const SUBSCRIPTION_KEY = '835b7b18b3e54b198139dee10f2cd6e9'
const ENDPOINT = 'https://nauti.cognitiveservices.azure.com'
const express = require('express')
const app = express()
const port = 3000;
const axios = require('axios').default;
const bodyParser = require('body-parser')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const cors = require('cors');


let subscriptionKey = process.env.SUBSCRIPTION_KEY
let endpoint = process.env.ENDPOINT + '/contentmoderator/moderate/v1.0/ProcessText'

app.use(cors());

const options = {
    swaggerDefinition: {
        info: {
            title: 'Content Moderator - Moderate Text API',
            version: '1.0.0',
            description: 'Use content filtering to detect potential profanity in more than 100 languages, flag text that may be deemed inappropriate depending on context (in public preview), and match text against your custom lists. Content Moderator also helps check for personally identifiable information (PII).'
        
        },
        host: "localhost:3000",
        basePath: "/",
    },
    apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.send('Hello! This is Moderate Text API.')
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
