# Wiki-API
This is a RESTful API to add, update and remove article to a local mongoDB database.  

## To get this working
* clone the repo  
* make sure you have npm installed 
* make sure you have mongoDB installed
* open a terminal and cd to where you cloned the repo  
* `npm i`
* `nodemon`
* go to `http://localhost:3000/articles` on a browser
* OR you can use postman or any other method to send HTTP requests

## To see all articles
Send a GET to `/articles`

## To add an article
Send a POST to `/articles` with the following body:
``` 
{
  "title": <YOUR_TITLE>,
  "content": <YOUR_CONTENT>
}
```

## To delete all articles
Send a DELETE to `/articles`

## To see a single article
Send a GET to `/articles/<ARTICLE_TITLE>`

## To update a single article
Send a PATCH or PUT to `/articles/<ARTICLE_TITLE>` with the following body:
``` 
{
  "title": <YOUR_TITLE>,
  "content": <YOUR_CONTENT>
}
```
## To delete a single article
Send a DELETE to `/articles/<ARTICLE_TITLE>`
