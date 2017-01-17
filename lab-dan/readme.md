#Authentication Server
## By Dan Peters

This authentication server connects to a mongoose database which stores
usernames and passwords. It uses Basic authentication.

POST ```/register```
Submit username and password to add users to db

GET ```/users```
Must be an authorized admin to see all users

GET ```/users/[username]```
Send with basic authentication to view specific user data
