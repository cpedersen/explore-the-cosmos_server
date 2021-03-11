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

- Every request must contain a _requests_ list.
- Within the _requests_ list:
  - _image_ specifies the image file (image can be passed via cloud storage or via an HTTP or HTTPS url)
  - _features_ lists the types of annotation to perform on the image. You can specify one or many times, as well as the _maxResults_ to return for each. In this implementation, LABEL_DETECTION was used. There are other supported features, though:
    - TYPE_UNSPECIFIED
    - FACE_DETECTION
    - LANDMARK_DETECTION
    - LOGO_DETECTION
    - LABEL_DETECTION
    - TEXT_DETECTION
    - DOCUMENT_TEXT_DETECTION
    - SAFE_SEARCH_DETECTION
    - IMAGE_PROPERTIES
    - CROP_HINTS
    - WEB_DETECTION
    - PRODUCT_SEARCH
    - OBJECT_LOCALIZATION

Optional:

- Within the requests list:
  - _imageContext_ specifies hints to the service to help with annotation (boudning boxes, languages, and crop hints aspect ratios)

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

A fetch image request may fail if the specified host denies the request (due to request throttling or DOS prevention), or if Google throttles requests to the site for abuse prevention.

For a complete list of possible errors, see the following:

- https://cloud.google.com/vision/docs/reference/rest/v1/Code

### Sample Call

The following is a sample curl call using credentials saved in a request.json file:

curl -X POST \
-H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
-H "Content-Type: application/json; charset=utf-8" \
-d @request.json \
https://vision.googleapis.com/v1/images:annotate
