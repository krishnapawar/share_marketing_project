import React from 'react';

const SelectInput = ({ id, value, onChange, options, selected=false, className = '',style={} }) => {
    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            style={style}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value} selected={option.value == selected ? true : false }>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
