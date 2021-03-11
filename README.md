# Explore the Cosmos Server

The server-side of the `Explore the Cosmos` app
provides a database of 100 Carl Sagan quotes. These quotes
are randomly generated when the user goes to the
homepage and when the user generates new searches
on the search page.

In addition, the server-side incorporates the Google Vision Label API,
so that each NASA image has associated labels that can be used in a search.

## Google Vision Label API

The following documentation describes how to use the Google Vision Label API to detect labels in a remote image.

### HTTP Method and URL

POST https://vision.googleapis.com/v1/images:annotate

### Request JSON Body

![Alt text](./readme/JSONBody.jpg?raw=true "JSONBody")

### URL Params

Required:

Optional:

### Data Params

A LABEL_DETECTION response includes the detected labels, their score, topicality, and an opaque label ID where:

- mid - if present, contains a machine-generated identifier.
- description - label description
- score - the confidence score, which ranges from 0 (no confidence) to 1 (very high confidence)
- topicality - the relevancy of the Image Content Annotation (ICA) label to the image. It measures how important/central a label is to the overall context of a page.

![Alt text](./readme/SampleData.jpg?raw=true "SampleData")

### Success Response

If the request is successful, the server returns a 200 OK HTTP status code and the response in JSON format.

### Error Response

### Sample Call

The following is a sample curl call using credentials saved in a request.json file:

curl -X POST \
-H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
-H "Content-Type: application/json; charset=utf-8" \
-d @request.json \
https://vision.googleapis.com/v1/images:annotate
