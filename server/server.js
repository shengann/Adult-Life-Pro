import express from 'express';
import dotenv from 'dotenv'

dotenv.config()
import connectDB from './config/connectDB.js'

const port = process.env.PORT || 5000

//routers

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome')
})

const start = async () => {
    try {
        await connectDB()
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()