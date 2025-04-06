import { useState } from 'react';
import styles from '../../styles/Admin.module.css';

export default function DataTable({ columns, rows, pageSize = 10 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows?.filter(row =>
        Object.values(row).some(
            value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredRows.length / pageSize);
    const paginatedRows = filteredRows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className={styles.dataTable}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={styles.tableResponsive}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.field} style={{ width: column.width }}>
                                    {column.headerName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows.map((row) => (
                            <tr key={row.id}>
                                {columns.map((column) => (
                                    <td key={`${row.id}-${column.field}`} data-label={column.headerName}>
                                        {column.renderCell
                                            ? column.renderCell({ row, value: row[column.field] })
                                            : row[column.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredRows.length === 0 && (
                <div className={styles.noResults}>No records found</div>
            )}

            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}