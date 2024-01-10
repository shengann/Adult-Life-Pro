import Friend from '../../models/friendsModel.js';

export const expenseUpdateFriendAmount = async (friendName, amount, paidBy) => {
    try {
        const getFriendResult = await Friend.findOne({ name: friendName }).lean();
        let updatedAmount = getFriendResult ? getFriendResult.amount : 0;

        if (paidBy === "You") {
            updatedAmount -= amount;
        } else {
            updatedAmount += amount;
        }
        let result
        if (getFriendResult) {
            result = await Friend.findOneAndUpdate({ _id: getFriendResult._id }, {
                ...getFriendResult._doc,
                amount: updatedAmount
            });
        } else {
            result = await Friend.create({ name: friendName, amount: updatedAmount });
        }
        return result;
    } catch (e) {
        console.error("Error updating/creating friend:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
