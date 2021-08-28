Hello this is simple users api

- Add your environmental variables in `.env` file

```
PORT=your own localhost port
DB_URL=your local url db or cluster url
SECRET_KEY=your secret key
```

- Install packages: 
```
npm install.
```

## 🎈 Api Actions
```
/api/users/get/:id
/api/users/:id (delete method | Need auth token in headers. example: Bearer -there put token- )
/api/users/:id (put method | Need auth token in headers. example: Bearer -there put token- )
/api/auth/login (params in body: email, password)
/api/users/register (params in body: email, password, username)
```

Note: You can get token after login.
