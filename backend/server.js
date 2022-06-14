// Import express 
let express = require('express');
const cors = require('cors');

// Initialize the app 
let app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:4000'], credentials: true
}));

const db = require('./db.js')

// Creating all the tables
//db.sync({ force: true })
db.sync();

let router = require('./routes');
app.use("/", router)

// Launch app to listen to specified port
app.listen(8000, function () {
    //console.log('Runnings on port 8000');
})