import CashFlow from '../../models/cashFlowsModel.js';
import Joi from 'joi'
import { cashFlowUpdateFriendAmount } from './cashFlowService.js';

const friendSchema = Joi.object({
    date: Joi.date().required(),
    amount: Joi.number().strict().required(),
    source: Joi.string().required(),
    transferDestination: Joi.string().required()
})

const createCashFlow = async (req, res) => {
    try {
        const { error } = friendSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const friend = await CashFlow.create(req.body)
        await cashFlowUpdateFriendAmount(req.body)
        res.status(201).json({ friend })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

const getAllCashFlow = async (req, res) => {
    try {
        const friends = await CashFlow.find({})

        res.status(200).json(friends);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const updateCashFlow = async (req, res) => {
    try {
        const { id: friendId } = req.params
        const { amount, category, date } = req.body

        if (!amount || !category || !date) {
            res.status(400).json({ error: 'Please Provide all values' });
            return;
        }
        const friend = await CashFlow.findById(friendId);

        if (!friend) {
            res.status(400)
            throw new Error('CashFlow not found')
        }
        const updatedCashFlow = await CashFlow.findOneAndUpdate({ _id: friendId }, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({ updatedCashFlow })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

const deleteCashFlow = async (req, res) => {
    try {
        const { id: friendId } = req.params
        const friend = await CashFlow.findById(friendId);

        if (!friend) {
            res.status(400).json({ error: 'CashFlow not found' });
            return;
        }
        await friend.deleteOne()
        res.status(200).json({ friend })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { createCashFlow, deleteCashFlow, getAllCashFlow, updateCashFlow };
