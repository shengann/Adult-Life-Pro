const computeSplitGroupAmountSum = (splitGroup) => {
    return splitGroup.reduce((sum, item) => sum + item.amount, 0);
};


const splitExpense = (amount, splitOptions, splitGroup) => {
    if (splitOptions === 'Unequally') {
        const splitGroupAmountSum = computeSplitGroupAmountSum(splitGroup);
        return amount - splitGroupAmountSum;
    } else if (splitOptions === 'Equally') {
        return (amount / (splitGroup.length+1)).toFixed(2);
    }
};

export default splitExpense;
