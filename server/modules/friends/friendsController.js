import Friend from '../../models/friendsModel.js';
import Joi from 'joi'
import Expense from '../../models/expensesModel.js';
import CashFlow from '../../models/cashFlowsModel.js';

const friendSchema = Joi.object({
    amount: Joi.number().strict().required(),
    name: Joi.string().required(),
    expenseId: Joi.string().required(),
    phoneNo: Joi.number(),
    email: Joi.string()
})

const createFriend = async (req, res) => {
    try {
        const { error } = friendSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const friend = await Friend.create(req.body)
        res.status(201).json({ friend })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

const getAllFriend = async (req, res) => {
    try {
        const { name } = req.query;
        const filter = {};
        if (name !== undefined && name !== '') {
            filter.name = { $regex: new RegExp(name, 'i') };
        }
        const friends = await Friend.find(filter);

        const sortedFriends = friends.sort((a, b) => {
            if (a.amount === 0 && b.amount === 0) {
                return 0;
            } else if (a.amount === 0) {
                return -1;
            } else if (b.amount === 0) {
                return 1;
            } else {
                return a.amount - b.amount;
            }
        });

        res.status(200).json(sortedFriends);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const updateFriend = async (req, res) => {
    try {
        const { id: friendId } = req.params
        const { amount, category, date } = req.body

        if (!amount || !category || !date) {
            res.status(400).json({ error: 'Please Provide all values' });
            return;
        }
        const friend = await Friend.findById(friendId);

        if (!friend) {
            res.status(400)
            throw new Error('Friend not found')
        }
        const updatedFriend = await Friend.findOneAndUpdate({ _id: friendId }, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({ updatedFriend })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

const deleteFriend = async (req, res) => {
    try {
        const { id: friendId } = req.params
        const friend = await Friend.findById(friendId);

        if (!friend) {
            res.status(400).json({ error: 'Friend not found' });
            return;
        }
        await friend.deleteOne()
        res.status(200).json({ friend })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayable = async (req, res) => {
    try {
        const friends = await Friend.find({ amount: { $gt: 0 } })

        res.status(200).json(friends);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const getReceivable = async (req, res) => {
    try {
        const friends = await Friend.find({ amount: { $lt: 0 } })

        res.status(200).json(friends);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const getFriend = async (req, res) => {
    try {
        const {name} = req.query
        const friends = await Friend.find({ name: {$regex: new RegExp(name, 'i') } })

        res.status(200).json(friends);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const getFriendDetail = async (req, res) => {
    try {
        const { id: friendId } = req.params

        const friend = await Friend.findById(friendId).lean();
        const expenses = await Expense.find({ _id: { $in: friend.expenseIds } }).sort({ date: -1 }).lean()
        let cashFlows = [];
        if (friend.cashFlowIds && friend.cashFlowIds.length > 0) {
            cashFlows = await CashFlow.find({ _id: { $in: friend.cashFlowIds } }).sort({ date: -1 }).lean();
        }

        const result = expenses.concat(cashFlows);
        res.status(200).json(result);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

export { createFriend, deleteFriend, getAllFriend, updateFriend, getPayable, getReceivable, getFriendDetail };
