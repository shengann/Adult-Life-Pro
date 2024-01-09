import express from 'express';
import dotenv from 'dotenv'
import ConnectDB from './config/connectDb.js'
import ExpensesRouter from './routes/expensesRoute.js'
import FriendsRouter from "./routes/friendsRoute.js"

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome')
})
app.use('/api/v1/expenses', ExpensesRouter)
app.use('/api/v1/friends', FriendsRouter)

const start = async () => {
    try {
        await ConnectDB()
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()