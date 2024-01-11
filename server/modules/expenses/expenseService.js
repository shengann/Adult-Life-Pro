import Friend from '../../models/friendsModel.js';

export const expenseUpdateFriendAmount = async (friendName, amount, paidBy, expenseId) => {
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
            const updatedExpenseIds = getFriendResult.expenseIds.length === 0 ? [expenseId] : getFriendResult.expenseIds.concat(expenseId); result = await Friend.findOneAndUpdate({ _id: getFriendResult._id }, {
                ...getFriendResult._doc,
                amount: updatedAmount,
                expenseIds: updatedExpenseIds
            });
        } else {
            const expenseIds = [expenseId]
            result = await Friend.create({ name: friendName, amount: updatedAmount, expenseIds: expenseIds },);
        }
        return result;
    } catch (e) {
        console.error("Error updating/creating friend:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
