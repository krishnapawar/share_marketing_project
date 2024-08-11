import React from 'react';

const Table = ({ columns, data, actions=false }) => {
    return (
        <table className="responsive-table divide-gray-200">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            {column.label ?? '-'}
                        </th>
                    ))}
                    {actions && (
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400"
                                data-label={column.label}
                            >
                                {column.key === 'id' ? index + 1 : (column.render ? column.render(item) : item[column.key] ?? '-')}
                            </td>
                        ))}
                        {actions && (
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400"
                                data-label="Actions"
                            >
                                {actions(item)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
