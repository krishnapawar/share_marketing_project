import React from 'react';
import { Link } from "@inertiajs/react";
const Table = ({ columns, data, actions=false, paginate=false }) => {
    return (
        <>
            <table className="responsive-table divide-gray-200">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 bg-gray-50  text-left text-xs leading-4 font-medium text-gray-500  uppercase tracking-wider"
                            >
                                {column.label ?? '-'}
                            </th>
                        ))}
                        {actions && (
                            <th className="px-6 py-3 bg-gray-50  text-left text-xs leading-4 font-medium text-gray-500  uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white  divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 "
                                    data-label={column.label+" :- "}
                                >
                                    {column.key === 'id' ? index + 1 : (column.render ? column.render(item) : item[column.key] ?? '-')}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 "
                                    data-label="Actions"
                                >
                                    {actions(item)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                // Add paginate 
                paginate && (
                    <div className="mt-4">
                        {paginate.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url}
                                className={`mr-2 px-4 py-2 border rounded-lg ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-700"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default Table;
