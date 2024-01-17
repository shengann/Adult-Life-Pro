import Expense from '../../models/expensesModel.js';
import { expenseUpdateFriendAmount } from './expenseService.js';
import Joi from 'joi'

const expenseSchema = Joi.object({
    date: Joi.date().required(),
    amount: Joi.number().strict().required(),
    category: Joi.string().required(),
    description: Joi.string(),
    splitOptions: Joi.string().valid('Equally', 'Unequally'),
    splitGroup: Joi.array(),
    personalExpense: Joi.number().strict(),
    paidBy: Joi.string(),
    paidBy: Joi.string(),
    note: Joi.string()
})

const createExpense = async (req, res) => {
    try {
        const { splitOptions, splitGroup, personalExpense, paidBy } = req.body

        const { error } = expenseSchema.validate(req.body);
        if (error) {
            console.error({ "error": error })
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const expense = await Expense.create(req.body)

        if (splitOptions && splitGroup && personalExpense && paidBy && expense) {
            const friendUpdates = splitGroup.map(item => expenseUpdateFriendAmount(item, paidBy, expense._id.toString(), personalExpense));
            await Promise.all(friendUpdates);
        }
        res.status(201).json({ expense })
    } catch (e) {
        console.error("Error creating expense:", e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllExpense = async (req, res) => {
    try {
        const { date } = req.query;
        const filter = {};
        if (date !== undefined && date !== '') {
            const parsedDate = new Date(date);
            const year = parsedDate.getFullYear();
            const month = parsedDate.getMonth() + 1; // Month is not zero-based in this case

            const startDate = new Date(year, month - 1, 1); // Month is zero-based
            const endDate = new Date(year, month, 0); // Get the last day of the month
            filter.date = {
                $gte: startDate,
                $lte: endDate,
            }
        }
        const expenses = await Expense.find(filter).sort({ date: -1 })
        const groupedExpenses = {};

        for (const expense of expenses) {
            const date = new Date(expense.date).toDateString();
            if (!groupedExpenses[date]) {
                groupedExpenses[date] = [];
            }

            groupedExpenses[date].push(expense);
        }

        //the output of the groupedExpenses will be:
        // {date: [{expense}],date: [{expense}],date: [{expense}]...} 
        //the output of the Object.entries(groupedExpenses):
        // [date,[{expense},{expense}]],[date,[{expense},{expense}]]
        const formattedExpenses = [];
        for (const [date, dayExpenses] of Object.entries(groupedExpenses)) {
            const totalExpense = dayExpenses.reduce((total, expense) => total + expense.amount, 0);
            const formattedTotalExpense = totalExpense.toFixed(2);

            formattedExpenses.push({
                date,
                items: dayExpenses,
                totalExpense: formattedTotalExpense,
            });
        }

        res.status(200).json(formattedExpenses);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }


};

const updateExpense = async (req, res) => {
    try {
        const { id: expenseId } = req.params
        const { amount, category, date } = req.body

        if (!amount || !category || !date) {
            res.status(400).json({ error: 'Please Provide all values' });
            return;
        }
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            res.status(400)
            throw new Error('Expense not found')
        }
        const updatedExpense = await Expense.findOneAndUpdate({ _id: expenseId }, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({ updatedExpense })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

const deleteExpense = async (req, res) => {
    try {
        const { id: expenseId } = req.params
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            res.status(400).json({ error: 'Expense not found' });
            return;
        }
        await expense.deleteOne()
        res.status(200).json({ expense })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { createExpense, deleteExpense, getAllExpense, updateExpense };
