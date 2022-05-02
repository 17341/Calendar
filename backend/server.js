// Import express 
let express = require('express');

// Initialize the app 
let app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200'
}));

const db = require('./db.js')

// Creating all the tables
// db.sync({ force: true })
db.sync();

let router = require('./routes');
app.use("/", router)

// Launch app to listen to specified port
app.listen(8000, function () {
    console.log('Runnings on port 8000');
})