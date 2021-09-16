# Cardy - flashcard application (alpha ver)

## Introduction

Inspired by Anki and Memrise, Cardy is a community-driven flashcard application that uses Spaced Repetition to help you learn more efficiently. Users can sign up, create their own decks or use shared ones to get started.

## The Challenge

Implement a full-blown flashcard application with the use of React, Express, MongoDB and GraphlQL. The main objective of the project was to deepen my understanding of the aforementioned technologies (many of which, I had limited experience before) and to streamline my workflow by learning Sass and the use of development and production variables, all this by striving to follow clean code principles so that the code could be easily understood and extended upon demand.

## My Approach

- To design the frontend, at first I used AdobeXD but later switched to Figma because I found it easier and more intuitive to use. The early prototypes can be found [here](https://www.figma.com/file/HeyCHNLkyKEyi1CROzWf4d/Cardy?node-id=0:1). Note that it's not organized and was used only during the first phases of development, so certain parts might be missing / different in the current version.
- For planning and organizing my thoughts, I used [Todoist](https://todoist.com/) which is a free todo app. Since a recent addition, it can be used similarly to [Trello](https://trello.com/en) where you can view your tasks in a board which makes it easy to organize things visually.

  ![Example of the Cardy project during its final phase of development](https://i.imgur.com/DrepdEq.jpg)

- The development started with building the frontend in React while using the npm package json-server to fake API calls. After finishing up the pages and deciding the structure of the project, I moved onto learning GraphQL and building my own API. When I was done with a few API endpoints, I connected the frontend with the backend and from this point, both sides were developed simultaneously.

## Tech Used

### Frontend (this repo)

- HTML
- CSS (grid, flexbox, animations)
- Sass (variables, mixins)
- React (a variety of hooks, context, react-router)
- Apollo Client (for GraphQL requests)
- LocalStorage
- Figma

### [Backend](https://github.com/Riyomi/cardy-backend)

- Node
- Middlewares
- MongoDB
- HTTP only cookies
- JSON web tokens
- Bycript (to hash passwords)
- Express
- Express GraphQL (to implement GraphlQL API endpoints)

### Deployment

- Netlify (frontend)
- Heroku (backend)

## Future additions and improvements

- Currently there is no way to upload pictures (deck and profile pictures). I'd like to make this feature available by using Cloudinary (which I used before in an other project) or AWS to store and fetch pictures from.
- Currently there is no way to change user information (email, username, password). This is a rather basic feature, so I'd like to add this in the future.
- Pagination for browse page and cards. Currently, this isn't an issue since there is little data in the database, but it can quickly become a problem when the app grows.
- Image and audio for the cards to help users learn even more effectively.
- Export deck feature. Decks could be exported in CSV or XML format.
- Bulk add cards. It can be a bit troublesome to add cards when you already have hundreds of them premade.
- Adding unit and integration tests by using jest and react-testing-library.
- Although storing refresh tokens as HTTP only cookies prevents Cross-site scripting (XSS) attacks (since they cannot be read by JavaScript), they are not immune to Cross Site Request Forgery (CSRF), thus it's theoretically possible to make an unwanted request on the user's behalf, should they fall victim of social engineering. Two ways of making the website more secure would be: (1) invalidating refresh tokens when the user logs out [can be done by storing the current valid refresh tokens in the database] (2) implementing CSRF protection by using CSRF tokens.
