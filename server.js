const mongoose = require('mongoose');
const app = require('./app');

app.listen(3000, () => {
  console.log('Listening to port 3000');
});

const databaseURI = `mongodb+srv://anjan:<PASSWORD>@cluster0-crvhb.mongodb.net/test?retryWrites=true&w=majority`;

const password = `2k6LDbQiKzc0Mmaq`;

const DB = databaseURI.replace('<PASSWORD>', password);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('Connection established');
  });
