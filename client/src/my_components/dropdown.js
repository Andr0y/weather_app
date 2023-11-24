import * as React from 'react';

function Dropdown({ items = [], selectedItem, handleItem, itemType, isLoading }) {

    function handleChange(event) {
        const selectedName = event.target.value;
        const selectedItemObject = items.find(item => item.name === selectedName);
        if (typeof handleItem === 'function')
            handleItem(selectedItemObject);
    };

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className='input-group'>
            <label className='input-group-text' htmlFor={itemType}>Choose a {itemType}:</label>
            <select className="form-select" value={selectedItem.name} onChange={handleChange}>
                <option value="" disabled>Select a {itemType}</option>
                {items.map((item, index) => (
                    <option value={item.name} className="menu-item" key={index}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );

};

export default Dropdown;
