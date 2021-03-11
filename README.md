# Explore the Cosmos Server

The server-side of the `Explore the Cosmos` app
provides a database of 100 Carl Sagan quotes. These quotes
are randomly generated when the user goes to the
homepage and when the user generates new searches
on the search page.

In addition, the server-side incorporates the Google Vision Label API,
so that each NASA image has associated labels that can be used in a search.

## Google Vision Label API

### URL

### Method

### URL Params

Required:

Optional:

### Data Params

### Success Response

### Error Response

### Sample Calls

Local:
http://localhost:3000/search?q=&media_type=image&year_start=1920&year_end=2021&keywords=sky&page=1

Remote:
https://explore-the-cosmos-client.vercel.app/search?q=mars&media_type=image&year_start=1920&year_end=2021&keywords=&page=1
