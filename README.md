# Microblog

Microblog is a full stack app where users can create/edit/delete posts, create/delete comments on those posts, and vote up/down
on the posts as well. It uses React, Redux, and Redux-Thunk on the frontend, and Node/Express and PostgreSQL on the backend.

See a live demo at https://microblog.demo.davidcsommers.dev/

## To Run This Repo Locally:

### Prerequisites
1. Install Node.js and npm
2. Install PostgreSQL

### Setup
1. Git clone this repo and `cd` into it

### Backend
1. `cd backend`
2. `psql < data.sql` (creates microblog db and seeds a little data)
3. `npm install`
4. `npm start` or `nodemon`

### Frontend
1. `cd frontend` (from base project directory)
2. `npm install`
3. `npm start`

## Tech Stack
### Backend
1. Node - Server Runtime Environment
2. Express - Node Web App Framework
3. PostgreSQL - Relational Database

### Frontend

1. React - FE JS Framework
2. React-Router - Library to create single page app
3. React-Redux - State management library
4. Redux-Thunk - Redux middleware to allow async action creators
5. React-Bootstrap - Bootstrap components as React components
6. React-Flip-Toolkit - Animation library for reordering list components
7. axios - http client

## Contributors
https://github.com/neecholai

Rithm Staff

Note: This was a pair project at Rithm bootcamp, focused on building the frontend with React/Redux. The frontend was
entirely built by Nicholai and myself (I came back afterwards and tweaked it). The backend is kindly provided 
by Rithm staff.
