import Friend from '../../models/friendsModel.js';

export const expenseUpdateFriendAmount = async (item, paidBy, expenseId,personalExpense) => {
    try {
        const getFriendResult = await Friend.findOne({ name: item.name }).lean();
        let updatedAmount = (getFriendResult) ? getFriendResult.amount : 0;

        if (paidBy === "You") {
            updatedAmount-= item.amount;
        } else {
            updatedAmount+= personalExpense;
        }
        let result
        if (getFriendResult) {
            const updatedExpenseIds = (getFriendResult && getFriendResult.expenseIds.length > 0)
                ? [...getFriendResult.expenseIds, expenseId]
                : [expenseId];

            result = await Friend.findOneAndUpdate({ _id: getFriendResult._id }, {
                ...getFriendResult._doc,
                amount: updatedAmount,
                expenseIds: updatedExpenseIds
            });
        } else {
            const expenseIds = [expenseId]
            result = await Friend.create({ name: item.name, amount: updatedAmount, expenseIds: expenseIds },);
        }
        return result;
    } catch (e) {
        console.error("Error updating/creating friend:", e);
        throw e;
    }
};
