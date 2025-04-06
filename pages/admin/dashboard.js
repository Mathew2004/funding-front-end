import { useEffect, useState } from "react";
import { Heart, Search, ChevronDown, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useAdminAuth from "@/hooks/useAdminAuth";
import { format } from "date-fns";

export default function AdminDashboard() {
    useAdminAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const [data, setData] = useState({});

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get("/donate/payments");
            setData(res.data.dashboardData);
            setDonations(res.data.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filterByDate = (dateStr) => {
        if (!startDate && !endDate) return true;
        const date = new Date(dateStr);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        if (start && date < start) return false;
        if (end && date > end) return false;
        return true;
    };

    const filteredDonations = donations.filter((donation) => {
        const matchesSearch = Object.values(donation).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus =
            statusFilter === "All" || donation.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesDate = filterByDate(donation.date);
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Heart className="h-8 w-8 text-red-500" />
                            <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Donations</h3>
                        <p className="text-3xl font-bold">BDT. {data.total}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Donors</h3>
                        <p className="text-3xl font-bold">{data.donors}</p>
                    </div>
                    {/* <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
                        <p className="text-3xl font-bold">80%</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
                        <p className="text-3xl font-bold">3</p>
                    </div> */}
                </div>

                <div className="bg-card rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-semibold">Recent Donations</h2>
                    </div>

                    {/* Search + Filters */}
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search className="h-4 w-4" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search donations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            >
                                {statusFilter}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </button>

                            {showStatusDropdown && (
                                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md">
                                    {["All", "Paid", "Unpaid"].map((status) => (
                                        <li
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setShowStatusDropdown(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {status}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Start Date */}
                        <div>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>


                    {/* Table */}
                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 rounded-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Donor</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Message</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                        <th className="w-[50px]"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredDonations.length > 0 ? (
                                        filteredDonations.map((donation) => (
                                            <tr key={donation.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 text-sm text-gray-800">{donation.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">Tk. {donation.amount}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{donation.phone}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{donation.message}</td>
                                                <td className="px-4 py-2 text-sm text-gray-800">{donation.date}</td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${donation.status.toLowerCase() === "paid"
                                                                ? "bg-green-100 text-green-800"
                                                                : donation.status.toLowerCase() === "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {donation.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2"></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-6 text-gray-500 text-sm">
                                                No donations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
