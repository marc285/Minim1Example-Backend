# Minim1Example-Backend
EA example of Minim1. Manager of Subjects and Students using Node.js with TypeScript, Express, and Mongoose with a MongoDB database.


## API Endpoints:

`degreeRoutes`  
HTTP --------------- URL --------------- Description  
GET   /degrees                           Returns the list of all the degrees  
GET   /degrees/:degreename/students      Returns the Students enrolled in the specified degree ('studies')  
  
`studentRoutes`  
HTTP --------------- URL --------------- Description  
GET   /students                          Returns the list of all the Students  
GET   /students/:studentid               Returns the details of a Student  
POST  /students/new                      Adds a new Student  
  
`subjectRoutes`  
HTTP --------------- URL --------------- Description  
GET   /subjects                          Returns the list of all the Subjects  
GET   /subjects/:subjectname             Returns the details of a Subject  
GET   /subjects/:subjectname/students    Returns the Subject with the Students in it (insted of their IDs)
~~GET   /subjects/:subjectname/students/:studentname Returns the details of a specific Student enrolled in a Subject~~  
POST  /subjects/new                      Adds a new Subject  
PUT   /subjects/:subjectname/addstudent  Adds the given Student to the given Subject  
