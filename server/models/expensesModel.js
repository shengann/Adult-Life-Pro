import mongoose from "mongoose";

const ExpensesSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    note: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
},
    { timestamps: true }
)


export default mongoose.model('Expenses', ExpensesSchema)