//              DEFINICJE

const express = require('express')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const app = express()
app.use(cookieParser());
app.use(express.json());
dotenv.config();
const cors = require('cors');
const UserR = require('./Routes/UserR.js');
const RoomR = require('./Routes/RoomR.js');
const MovieR = require('./Routes/MovieR.js');
const LangR = require('./Routes/LanguageR.js');
const ShowR = require('./Routes/ShowR.js');
const OrderR = require('./Routes/OrderR.js');
const baza = require('./Controllers/DataBaseC.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const server = app.listen(5000, () => {
    console.log(`App start na porcie 5000`)
})

app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true
}));
baza.connect();

//          EXIT

process.on('SIGINT', async () => {
    await baza.sequelize.close();
    server.close();
});

app.use("/api/api", UserR);
app.use("/api/room", RoomR);
app.use("/api/movie", MovieR);
app.use("/api/lang", LangR);
app.use("/api/show", ShowR);
app.use("/api/order", OrderR);
