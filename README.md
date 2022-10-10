
A full-stack project that practices my the use of React, Redux, Express, Node.js, PostgreSQL. 


---------- Functionalities   
- All Campuses/ All Students View 
  1. A list of campuses will be displayed when the url matches `/campuses`
  2. A list of students will be displayed when the url matches `/students`
  3. There are links in the navbar to navigate to the all-campuses view and the all-students view
- Single Campus/ Single Student View 
  1. A specific campus will be displayed when the url matches `/campuses/:campusId` (including its name, image, address, and description) 
  2. A specific student will be displayed when the url matches `/students/:studentId` (including name, image, email, and gpa) 
  3. Clicking on a campus(student) from the all-campuses(students) view should navigate to show that campus(student) in the single-campus(student) view
- Adding Campus/ Student
  1. There is a form for adding new campus(student) in the all-campuses(students) view
  2. Submitting the form the valid input will add the new entry to the page without having to refreshing the page 
- Removing Campus/ Student 
  1. There is an 'x' button next to each campus(student) in the all-campuses(students) view 
  2. Clicking on the button will remove the campus(student) from the page without having to refreshing the page 
- Updating Campus/ Student 
  1. There is a form for updating the campus(student) information on the top of single-campus(student) view
  2. Submitting the form the valid input will udpate the information on the page without having to refreshing the page 
  3. In the single-campus view, there will be an `Unregister` button next to each of its students, which removes the student from the campus (in the database as well as this view); the student is still in the database but is no longer associated with the campus


---------- Database  
- The `campuses` model contains the following information:
  - name - not empty or null
  - imageUrl - with a default value
  - address - not empty or null
  - description - extremely large text
- The `students` model contains the following information:
  - firstName - not empty or null
  - lastName - not empty or null
  - email - not empty or null; must be a valid email
  - imageUrl - with a default value
  - gpa - decimal between 0.0 and 4.0
- Students may be associated with at most one campus. Likewise, campuses may be associated with many students


---------- Instructions  
1. Fork and clone this repo.
2. Run`npm install`.
3. Create `final-project` and `final-project-test` databases.
4. Start the build process and your application with: `npm run start-dev`. 
5. Once the Sequelize models are set, run `npm run seed` to seed the database. 
6. Run the tests with: `npm test`. Working through the tests can be helpful
