import express from 'express';
import dotenv from 'dotenv'
import ConnectDB from './config/connectDB.js'
import ExpensesRouter from './routes/expensesRoute.js'
import FriendsRouter from "./routes/friendsRoute.js"
import cashFlowsRouter from "./routes/cashFlowsRoute.js"

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome')
})
app.use('/api/v1/expenses', ExpensesRouter)
app.use('/api/v1/friends', FriendsRouter)
app.use('/api/v1/cash-flows', cashFlowsRouter)

const start = async () => {
    try {
        await ConnectDB()
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()