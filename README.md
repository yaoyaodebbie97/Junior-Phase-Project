# Junior Phase Final Project

## Getting started

1. Fork and clone this repo.
2. `npm install`.
3. Read the rest of this `README.md` carefully - it contains the requirements for the project and the grading rubric that will be used to assess it.
4. Create `final-project` and `final-project-test` databases.
5. Start the build process and your application with: `npm run start-dev`. If you're using Windows, you may need to execute `npm run start-server` and `npm run build-watch` separately (in their own terminal tabs).
6. If you navigate to [localhost:1337](http://localhost:1337), you should see some UI already :) [We've provided some code to get you started]
7. Check out the mock-view in the `wireframes` folder to get an idea of what the project _could_ look like.
8. Run the tests with: `npm test`. Working through the tests is a good place to start!
9. Check out the starting seed file in `seed.js` - you can run it by executing `npm run seed`. You will need to seed the database once you've set up the Sequelize models.

## Details

### The Premise

You are the CTO of the Margaret Hamilton Interplanetary Academy of JavaScript. Create a RESTful web platform that allows you to manage your students and campuses. Before getting started, please carefully review the expectations as outlined below.

### The tools

For this project, you must use Express to handle HTTP requests and Sequelize to interface with your database. Likewise, you must use React, Redux and React-Redux on the front-end. This means that all important state (i.e. students and campuses) must be managed by the Redux store (unimportant state, like form data, may be managed by stateful React components). Components that display student/campus data should therefore be connected to the Redux store. If you perform side-effects (like AJAX requests), you should encapsulate them in thunks.

### Requirements + Rubric

For the requirements and rubric, refer to the following two files:

* `REQUIREMENTS.md` - contains the functional requirements of the project
* `RUBRIC.md` - contains the grading rubric for additional factors, as well as the formula for calculating the total score

Make sure to read them carefully!

There are some test specs already written for you to help you get started – these are _just a guide_ and are meant to help steer you through your coding process, or to be used as reference for writing your own test specs for extra credit (the tests that you can write for extra credit are marked with a leading \*\*\*). Passing or not passing these specs will not affect your grade.

### Views and Functionality

Take a look in the wireframes folder as a reference for how your front-end _could_ look. Of course, you are encouraged to be creative and flex your own design muscles, but the wireframes should function as a good baseline/inspirational resource. Either way, the most important part of the project is that it works - **design/appearance is extra-credit**. If there ever appears to be a conflict between the wireframes and the rubric/requirements below, **go with the letter of the rubric/requirements.**

## Other Important Info

### Video Walkthrough
Please submit a short, 5 minute screencast of a walk-through of the functionality for each user story in your app. E.g. for "As a user, I can create a project", you can fill out the form for creating a project and then see the new project appear in the projects list. *There is no need to show us the code you wrote.* We recommend using Quicktime to record the screencast (instructions on how to do that [here](https://support.apple.com/kb/PH5882?locale=en_US&viewlocale=en_US)).

Once you've recorded your screencast, please *upload it to YouTube as an unlisted video*. **Include a link to the video in your repo's README** and include your repo link in the video description. This will aid us in evaluating your submission.

Well before the deadline, we recommend practicing this by recording a very short screencast and uploading it as an unlisted video. If you encounter any technical issues, reach out to us so that we can help you resolve them.

## Evaluation

- Requirements score (70%)
- Rubric score (30%)
- Extra credit (15% max)
