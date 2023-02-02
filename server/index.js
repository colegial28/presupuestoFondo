require('dotenv').config()

const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//database connect
db
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Unable to connect to the database:', err));
db.sync()
    .then(() => console.log('All tables synced successfully'))
    .catch(err => console.error('Error syncing tables:', err));



//routes
app.use('/auth', require('./routes/auth'))
app.use('/', require('./routes/main'))



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(['Server running at port:', PORT].join('')))