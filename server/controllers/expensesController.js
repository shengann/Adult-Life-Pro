import Expense from '../models/expensesModel.js';

const createExpense = async (req, res) => {
    try {
        const { date, amount, category } = req.body

        if (!amount || !category || !date) {
            res.status(400).json({ error: 'Please Provide all values' });
            return;
        }
        const expense = await Expense.create(req.body)
        res.status(201).json({ expense })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

const getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({}).sort({ date: -1 })
        const groupedExpenses = [];

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
        const expense = await Expense.findById(expenseId );

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
