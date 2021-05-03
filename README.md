# Content Moderator - Text API

Content Moderator is an AI service that lets you handle potentially offensive, risky, or otherwise undesirable content. It uses Microsoft Azure's AI-powered content moderation service which scans text and applies content flags automatically. Using content filtering to detect potential profanity in more than 100 languages, flag text that may be deemed inappropriate depending on context (in public preview), and match text against your custom lists. Content Moderator also helps check for personally identifiable information (PII).

This API has two major POST calls:
### Screen
Use the API to scan your content. Content Moderator then processes your content and sends the results along with relevant information back to your systems. This call has few extra features which can be used:

    1) Autocorrect - Runs auto correction on the input, before running other operations.

    2) PII - Detects Personal Identifiable Information (PII) in the input. PII is any data that can be used to identify a specific individual. Social Security numbers, mailing or email address, and phone numbers have most commonly been considered PII, but technology has expanded the scope of PII considerably. It can include an IP address, login IDs, social media posts, or digital images.

    3) Custom lists - Use custom lists to block or allow content according to your own content policies.

    4) Classify - Enables Text Classification. This feature supports English only, and helps detect potentially undesired content. The feature uses a trained model to identify possible abusive, derogatory or discriminatory language. This includes slang, abbreviated words, offensive, and intentionally misspelled words for review.
        - Category1 refers to potential presence of language that may be considered sexually explicit or adult in certain situations.
        - Category2 refers to potential presence of language that may be considered sexually suggestive or mature in certain situations.
        - Category3 refers to potential presence of language that may be considered offensive in certain situations.
        - Score is between 0 and 1. The higher the score, the higher the model is predicting that the category may be applicable.
        - Review Recommended is either true or false depending on the internal score thresholds. Customers should assess whether to use this value or decide on custom thresholds based on their content policies.

### DetectLanguage
Use the API to detect the language the content is provided in.

## Live Demo

Live demo is available [here](http://159.65.35.152:3000/) with [documentation](http://159.65.35.152:3000/docs) till 20th May 2021.

## Local setup
### Installation

Download the code from GitHub or clone the repository.

Use the package manager [npm](https://www.npmjs.com/get-npm) to install all project dependencies.

```bash
npm install
```

### Usage

Use the following bash command to run the node server.

```bash
node index.js
```
