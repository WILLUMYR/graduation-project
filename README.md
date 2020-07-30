# graduation-project
This is our graduation project for School of Applied techonology. During a period of two weeks we did two sprints to complete this project. 

# Link to app:

# Purpose of project
This is  an easy-to-use platform that can be used by organizations to provide mental health support for human traffic victims. The application currently supports two types of users: patients and psychologists. Patients can anonymously register, login and leave a message (create a case) for a mental health specialist and close the case at any time. Psychologists must already be in a system in order to login, work with cases, write notes and answer/talk to patients. The conversation between two parties works like a chat.

# Tech Stack 
We're using:
* Node / Express backend 
* React / TypeScript frontend
-> Linter using airbnb standard with again with typescript on the frontend. 

* Authentication is built with an auth middleware and JWT.

* Testing with mongodb-memory-server 
For integration testing our endpoints we used a module called mongodb-memory-server which allows us to run tests on your a simulated mongodb database on your machine instead of a remote mockdatabase. 

# To test this app on your machine: 
Supply a .env file in the server folder which should with the following variables:

MONGO_URI={YOUR_MONGO_DB_URI}

JWTSECRET={YOUR_JWT_SECRET}

NODE_ENV=dev

```bash
git clone git@github.com:Ymirke/graduation-project.git
cd graduation-project
npm run installAll
npm run dev
```
