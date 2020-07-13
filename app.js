const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const Cookie = require('cookie-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(cors())
app.use(Cookie())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'));
app.use('/', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Telah terkoneksi didalam port: ${port}`)
})