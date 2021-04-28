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
let endpoint = process.env.ENDPOINT

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


//Text Screening
/**
 * @swagger
 * definitions:
 *   Screen:
 *      properties:
 *          content:
 *              type: string
 *          autocorrect:
 *              type: boolean
 *          PII:
 *              type: boolean
 *          classify:
 *              type: boolean
 *          language:
 *              type: string
 *          listId:
 *              type: string
 *      required:
 *          - content
 */
/**
 * @swagger
 * /Screen:
 *    post:
 *      description: Use the API to scan your content as it is generated. Content Moderator then processes your content and sends the results along with relevant information either back to your systems  
 *      consumes:
 *          - text/plain
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful analysis of the input text.
 *          400:
 *              description: An error occurs if the body is invalid. 
 *      parameters:
 *          - name: content
 *            in: query
 *            description: This is the input which you want process. The content can be in text/html, text/xml, text/markdown or text/plain format.
 *            required: true
 *          - name: autocorrect
 *            in: query
 *            required: false
 *            enum: [true, false]
 *            default: true
 *            description: Runs auto correction on the input, before running other operations.
 *          - name: PII
 *            in: query
 *            required: false
 *            enum: [true, false]
 *            default: true
 *            description: Detects Personal Identifiable Information (PII) in the input.
 *          - name: listId
 *            in: query
 *            description: The Term list to be used for matching. Optional parameter, can be left blank.
 *            allowEmptyValue: true
 *          - name: classify
 *            in: query
 *            required: false
 *            enum: [true, false]
 *            default: true
 *            description: Enables Text Classification.
 *          - name: language
 *            in: query
 *            default: eng
 *            description: If no language is specified, it would default to English.
 *      schema:
 *          $ref: '#/definitions/Screen'
 *             
 */
app.post('/Screen', async (req, res) => {
    const parameters = new URLSearchParams();

    try{
        parameters.append('autocorrect', req.query.autocorrect);
        parameters.append('PII', req.query.PII);
        parameters.append('classify', req.query.classify);
        parameters.append('language', req.query.language);
        // console.log(req.query.content)

        axios.post(
            endpoint+'/Screen',
            req.query.content,
            {
                headers: { 'Content-Type': "text/plain",
                            'Ocp-Apim-Subscription-Key': subscriptionKey },
                params: parameters
            }
            ).then(function (response) {
                console.log('Status text: ' + response.status)
                console.log('Status text: ' + response.statusText)
                res.status(200).send(response.data);
            }).catch(function (error) {
                console.log(error)
                res.status(400).send();
        });
    }
    catch{
        res.status(400).send();
    }
    
})