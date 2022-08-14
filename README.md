# Social Network API
<a href="#license"><img src="https://img.shields.io/badge/license-mit-informational"></img></a>

## Description
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

### User Story
AS A social media startup <br>
I WANT an API for my social network that uses a NoSQL database <br>
SO THAT my website can handle large amounts of unstructured data

## Table of Contents
- <a href="#acceptance-criteria">Acceptance Criteria</a>
- <a href="#installation">Installation</a>
- <a href="#technologies-and-required-packages">Technologies and Required Packages</a>
- <a href="#usage">Usage</a>
- <a href="#mock-up">Mock-Up</a>
- <a href="#deployed-application">Deployed Application</a>
- <a href="contributors">Contributors</a>
- <a href="#license">License</a>


## Acceptance Criteria
GIVEN a social network API

WHEN I enter the command to invoke the application <br>
THEN my server is started and the Mongoose models are synced to the MongoDB database

WHEN I open API GET routes in Insomnia for users and thoughts <br>
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia <br>
THEN I am able to successfully create, update, and delete users and thoughts in my database

WHEN I test API POST and DELETE routes in Insomnia <br>
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation
- Clone the directly from the GitHub repository to your local machine.
- Run `npm init` in the command line.
- Run `npm i` in the command line.
- Run the command `npm start` to launch the application.

### Technologies and Required Packages
- *Express.js* for routing
- *MongoDB* database
- *Mongoose* Object-Document-Mapping

## Usage
To access a community of tech professionals who share blog posts of new information or technologies and commentary on the blogs.

## Mock-Up
<img src="./images/tech-blog_mockup.gif">

## Deployed Application
Live url: https://whispering-dusk-78788.herokuapp.com/<br>
Repo url: https://github.com/cpm-128/tech-blog

### Screencapture
<img src="./images/the-tech-blog_deployed.png">

## Contributors
Some bonus starter code provided by UNC Chapel Hill Bootcamp.
## License
MIT License

Copyright (c) [2022] [Colleen Maher]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.