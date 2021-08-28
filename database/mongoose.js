const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to the database'))
  .catch(err => {
    console.error(err)
  })
