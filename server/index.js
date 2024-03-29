const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// access all stuff in models
const db = require('./models');


// Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => { //Checks if there are any tables in models that are not in sql, and adds them 
    app.listen(3001, () => {
        console.log("server started");
    });
});



