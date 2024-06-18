const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const todoItemRoute = require("./routes/todoItem.routes");

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser());

mongoose
    .connect(process.env.DB_LINK)
    .then(() => console.log("Database connection established"))
    .catch((err) => console.log(err));

app.use("/", todoItemRoute)
//app.get('/', (req, res) => res.send("Hello from App"));

app.listen(port, () => console.log(`App is listening on ${port}`));

//omkajale09
//hGCP5bBdhiMixraW
//mongodb+srv://omkajale09:hGCP5bBdhiMixraW@cluster0.6u8xvfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0