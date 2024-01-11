import Friend from '../../models/friendsModel.js';
import Joi from 'joi'

const friendSchema = Joi.object({
    amount: Joi.number().required(),
    name: Joi.string().required(),
    expenseId: Joi.string().required(),
    phoneNo : Joi.number(), 
    email : Joi.string()
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
        const friends = await Friend.find({}).sort({ date: -1 })

        res.status(200).json(friends);
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


export { createFriend, deleteFriend, getAllFriend, updateFriend };
