import Friend from '../../models/friendsModel.js';

const INVALID_CASH_FLOW_SOURCE_ERROR = 'Invalid Cash Flow Source';

export const cashFlowUpdateFriendAmount = async (item, cashFlowId) => {
    try {
        const ownAccounts = ['Cash']
        const isOwnAccount = ownAccounts.includes(item.source);
        const friendName = isOwnAccount ? item.transferDestination : item.source;

        const getFriendResult = await Friend.findOne({ name: friendName }).lean();

        if (!getFriendResult) {
            throw new Error(INVALID_CASH_FLOW_SOURCE_ERROR);
        }

        const amountChange = isOwnAccount ? -item.amount : item.amount;
        const updatedcashFlowIds = (getFriendResult.cashFlowIds) ? [...getFriendResult.cashFlowIds, cashFlowId] : [cashFlowId];

        const result = await Friend.findOneAndUpdate({ _id: getFriendResult._id }, {
            ...getFriendResult._doc,
            amount: getFriendResult.amount + amountChange,
            cashFlowIds: updatedcashFlowIds
        });

        return result;
    } catch (e) {
        console.error("Error updating/creating friend:", e);
        throw e;
    }
};