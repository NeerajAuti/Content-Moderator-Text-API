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
            description: 'Azure Content Moderator is an AI service that lets you handle content that is potentially offensive, risky, or otherwise undesirable. It includes the AI-powered content moderation service which scans text and applies content flags automatically. Using content filtering to detect potential profanity in more than 100 languages, flag text that may be deemed inappropriate depending on context (in public preview), and match text against your custom lists. Content Moderator also helps check for personally identifiable information (PII). The following are a few scenarios in which a software developer or team would require a content moderation service: \n    - Online marketplaces that moderate product catalogs and other user-generated content. \n    - Gaming companies that moderate user-generated game artifacts and chat rooms. \n    - Social messaging platforms that moderate text added by their users. Enterprise media companies that implement centralized moderation for their content. \n    - K-12 education solution providers filtering out content that is inappropriate for students and educators.'
        
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
 *      description: Use the API to scan your content. Content Moderator then processes your content and sends the results along with relevant information back to your systems  
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
 *            description: Runs auto correction on the input, before running other operations. <b>Optional parameter</b>. 
 *          - name: PII
 *            in: query
 *            required: false
 *            enum: [true, false]
 *            default: true
 *            description: Detects Personal Identifiable Information (PII) in the input. PII is any data that can be used to identify a specific individual. Social Security numbers, mailing or email address, and phone numbers have most commonly been considered PII, but technology has expanded the scope of PII considerably. It can include an IP address, login IDs, social media posts, or digital images. <b>Optional parameter</b>. 
 *          - name: listId
 *            in: query
 *            description: Enter the listId of the list of banned words to be used for filtering the content. Leave blank to use the default list. Use custom lists to block or allow content according to your own content policies. Custom lists can be created using the instructions on this link https://docs.microsoft.com/en-us/azure/cognitive-services/content-moderator/try-terms-list-api. <b>Optional parameter</b>. 
 *            allowEmptyValue: true
 *          - name: classify
 *            in: query
 *            required: false
 *            enum: [true, false]
 *            default: true
 *            description: 'Enables Text Classification. This feature supports English only, and helps detect potentially undesired content. The feature uses a trained model to identify possible abusive, derogatory or discriminatory language. This includes slang, abbreviated words, offensive, and intentionally misspelled words for review.<br>    - <b>Category1</b> refers to potential presence of language that may be considered sexually explicit or adult in certain situations.<br>    - <b>Category2</b> refers to potential presence of language that may be considered sexually suggestive or mature in certain situations.<br>    - <b>Category3</b> refers to potential presence of language that may be considered offensive in certain situations.<br>    - <b>Score</b> is between 0 and 1. The higher the score, the higher the model is predicting that the category may be applicable.<br>    - <b>Review Recommended</b> is either true or false depending on the internal score thresholds. Customers should assess whether to use this value or decide on custom thresholds based on their content policies. <b>Optional parameter</b>. '
 *          - name: language
 *            in: query
 *            default: eng
 *            description: If no language is specified, it would default to English. <b>Optional parameter</b>. 
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



//Detect Language
/**
 * @swagger
 * definitions:
 *   DetectLanguage:
 *      properties:
 *          content:
 *              type: string
 *      required:
 *          - content
 */
/**
 * @swagger
 * /DetectLanguage:
 *    post:
 *      description: Use the API to detect the language the content is provided in.
 *      consumes:
 *          - text/plain
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful language detection of the input text.
 *          400:
 *              description: An error occurs if the body is invalid. 
 *      parameters:
 *          - name: content
 *            in: query
 *            description: This is the input which you want process. The content can be in text/html, text/xml, text/markdown or text/plain format.
 *            required: true
 *      schema:
 *          $ref: '#/definitions/DetectLanguage'
 *             
 */
 app.post('/DetectLanguage', async (req, res) => {

    try{
       
        axios.post(
            endpoint+'/DetectLanguage',
            req.query.content,
            {
                headers: { 'Content-Type': "text/plain",
                            'Ocp-Apim-Subscription-Key': subscriptionKey },
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