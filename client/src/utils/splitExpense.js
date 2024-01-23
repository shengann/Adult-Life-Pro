import computeTotal from "./computeTotal";


const splitExpense = (amount, splitOptions, splitGroup) => {
    if (splitOptions === 'Unequally') {
        const splitGroupAmountSum = computeTotal(splitGroup);
        return amount - splitGroupAmountSum;
    } else if (splitOptions === 'Equally') {
        return (amount / (splitGroup.length+1)).toFixed(2);
    }
};

export default splitExpense;
