const computeTotal = (data) => {
    return data.reduce((sum, item) => sum + item.amount, 0);
};

export default computeTotal;
