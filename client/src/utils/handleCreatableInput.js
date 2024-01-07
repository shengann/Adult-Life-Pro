const handleCreatableInput = (splitGroup, expenseData) => {
    const initialSplitGroup = expenseData.splitGroup.map((item) => item.name);

    if (initialSplitGroup.length < splitGroup.length) {
        const newSplitGroup = splitGroup.filter(item => !initialSplitGroup.includes(item));
        const updatedSplitGroup = [...expenseData.splitGroup, { name: newSplitGroup[0], amount: null }];
        return updatedSplitGroup
    } else if (initialSplitGroup.length > splitGroup.length) {
        const deletedSplitGroup = initialSplitGroup.filter(item => !splitGroup.includes(item));
        const updatedSplitGroup = expenseData.splitGroup.filter(item => !deletedSplitGroup.includes(item.name));
        return updatedSplitGroup
    }
};

export default handleCreatableInput;
