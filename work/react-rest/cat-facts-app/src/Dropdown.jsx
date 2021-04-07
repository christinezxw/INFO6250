const Dropdown = function ({ updatePageSize }) {
    const handleChange = function (e) {
        const value = parseInt(e.target.value, 10);
        updatePageSize({ size: value });
    }
    return (
        <div>
            <div>Facts per page:</div>
            <select onChange={handleChange}>
                <option value="5" select="selected">5</option>
                <option value="10">10</option>
            </select>
        </div>
    );
};

export default Dropdown;