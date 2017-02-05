#Authentication Server
## By Dan Peters

This authentication server connects to a mongoose database which stores
usernames and passwords. It uses Basic authentication and Bearer tokens.

POST ```/register```
Submit username and password in body to add users to db

POST ```/login```
Submit user and pass via basic authentication. Returns a token.

GET ```/users```
Must use Bearer token. Must be an authorized admin to see all users, otherwise returns just the user's info

GET ```/users/[username]```
Must use Bearer token. Can only view users as authorized.
