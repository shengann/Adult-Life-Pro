import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    expenseIds: {
        type: Array,
    },
    phoneNo: {
        type: Number,
    },
    email: {
        type: String,
    }
},
    { timestamps: true }
)


export default mongoose.model('Friends', friendsSchema)