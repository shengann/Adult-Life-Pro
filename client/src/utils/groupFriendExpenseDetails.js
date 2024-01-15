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

    return groupedByMonthAndYear
};

export default groupFriendExpenseDetails;
