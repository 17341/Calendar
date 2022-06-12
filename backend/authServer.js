require('dotenv').config()
let cookieParser = require('cookie-parser')

const express = require('express')
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken');
const tokenController = require('./controllers/tokenController');
const userController = require('./controllers/userController');

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:8000'], credentials: true
}));


app.post('/token', tokenController.tokenSearch, (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.cookie('accessToken', accessToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })
        res.send({
            accessToken
        });
    })
})

app.post('/logout', tokenController.tokenDelete)

app.post('/login', userController.userLogin, (req, res) => {

    const email = req.body.email
    const user = { email: email }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    req.body.token = refreshToken
    tokenController.tokenAdd(req, res).then(() => {
        res.cookie('accessToken', accessToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })

        res.send({
            accessToken
        });
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })

})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
}

app.listen(4000)