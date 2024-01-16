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
    source: {
        type: String
    },
    transferDestination: {
        type: String
    }
},
    { timestamps: true }
)


export default mongoose.model('CashFlows', ExpensesSchema)