import moment from "moment";

const groupFriendExpenseDetails = (friendExpenseDetails) => {
    const groupedByMonthAndYear = [];

    friendExpenseDetails.forEach(currentItem => {
        const date = moment(currentItem.date);
        const monthYear = date.format('MMM YYYY');

        const existingEntry = groupedByMonthAndYear.find(entry => entry.date === monthYear);

        if (existingEntry) {
            existingEntry.items.push(currentItem);
        } else {
            groupedByMonthAndYear.push({
                date: monthYear,
                items: [currentItem],
            });
        }
    });

    const sortedResult = groupedByMonthAndYear.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    return sortedResult
};

export default groupFriendExpenseDetails;
