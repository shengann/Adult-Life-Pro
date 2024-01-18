const categoryIcons = {
    "Shoppping": '\u{1F6D2}',
    "Transportation": '\u{1F68C}',
    "Dining Out": '\u{1F372}',
    "Utilities": '\u{1F4A1}',
    "Education": '\u{1F3EB}',
    "Entertainment": '\u{1F3A5}',
    "Charity": '\u{1F49D}',       
    "Groceries": '\u{1F96C}',
    "Travel": '\u{1F6EB}'
};

const Icon = ({ category }) => {
    const selectedEmoji = categoryIcons[category] || '\u{1F4B8}'; // Default emoji if not found
    return <span>{selectedEmoji}</span>;
};

export default Icon;

