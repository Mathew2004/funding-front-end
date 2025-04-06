import Head from 'next/head';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import DataTable from '../../components/admin/DataTable';
import styles from '../../styles/Admin.module.css';
import axios from 'axios';
import useAdminAuth from '@/hooks/useAdminAuth';

export default function AdminDashboard() {
    useAdminAuth();

    const [activeTab, setActiveTab] = useState('donations');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [data, setData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const res = await axios.get("/donate/payments");
        setData(res.data.data);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
        console.log(data);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        { field: 'date', headerName: 'Date', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <span className={`status-badge ${params.value}`}>
                    {params.value}
                </span>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div className="action-buttons">
                    <button className="view-btn" onClick={() => handleView(params.row)}>
                        View
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(params.row.id)}>
                        Delete
                    </button>
                </div>
            )
        },
    ];

    const handleView = (row) => {
        alert(`Viewing donation ID: ${row.id}`);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            setData(data.filter(item => item.id !== id));
        }
    };

    return (
        <div className={styles.adminContainer}>
            <Head>
                <title>Admin Dashboard</title>
            </Head>

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={sidebarOpen}
            />

            <div className={`${styles.mainContent} ${sidebarOpen ? '' : styles.sidebarCollapsed}`}>
                <Header
                    title="Donation Management"
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <div className={styles.dashboardContent}>
                    <div className={styles.statsCards}>
                        <div className={styles.statCard}>
                            <h3>Total Donations</h3>
                            <p>$1,245</p>
                            <span>+12% from last month</span>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Completed</h3>
                            <p>42</p>
                            <span>+5 from last month</span>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Pending</h3>
                            <p>3</p>
                            <span>+1 from last week</span>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Failed</h3>
                            <p>2</p>
                            <span>No change</span>
                        </div>
                    </div>

                    <div className={styles.dataTableContainer}>
                        <div className={styles.tableHeader}>
                            <h2>Recent Donations</h2>
                            <div className={styles.tableActions}>
                                <button className={styles.exportBtn}>Export CSV</button>
                                <button className={styles.addBtn}>+ Add New</button>
                            </div>
                        </div>
                        {loading ? <div className={styles.loading}>Loading...</div>
                            :
                            <DataTable
                                columns={columns}
                                rows={data}
                                pageSize={5}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
