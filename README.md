# Minim1Example-Backend
EA example of Minim1. Manager of Subjects and Students using Node.js with TypeScript, Express, and Mongoose with a MongoDB database.


API Endpoints:

degreeRoutes
HTTP -------------------- URL -------------------- Description
GET   /degrees/:degreename/students                Returns the Students enrolled in the specified degree ('studies')

studentRoutes
HTTP -------------------- URL -------------------- Description
GET   /students/all                                Returns the list of all the Students
GET   /students/:studentname                       Returns the details of a Student
POST  /students/new                                Adds a new Student

subjectRoutes
HTTP -------------------- URL -------------------- Description
GET   /subjects/all                                Returns the list of all the Subjects
GET   /subjects/:subjectname                       Returns the details of a Subject
GET   /subjects/:subjectname/students              Returns the list of Students of a given Subject
GET   /subjects/:subjectname/students/:studentname Returns the details of a specific Student enrolled in a Subject
POST  /subjects/new                                Adds a new Subject
POST  /subjects/:subjectname/addstudent            Adds the given Student to the given Subject
