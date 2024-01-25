const handleErrors = (res, e) => {
    console.error(e);

    if (e.code === 8000 && e.codeName) {
        res.status(403).json({ error: e.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handleErrors;
