Hello this is simple users api

Change the information in the .env file to your own.

Install packages: npm install.

Actions
/api/users/get/:id
/api/users/:id (delete method | Need auth token in headers. example: 'Bearer "there put token" ')
/api/users/:id (put method | Need auth token in headers. example: 'Bearer "there put token" ')
=============================
/api/auth/login (params in body: email, password)
/api/users/register (params in body: email, password, username)

Note: You can get token after login.
