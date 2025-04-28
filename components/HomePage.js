import axios from "axios";
import { BadgeDollarSign, Clock, Heart, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [dashboardData, setDashboardData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get("/donate/dashboard");
                setDashboardData(res.data.dashboardData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
            {/* Navbar */}
            <nav className="w-full border-b bg-white dark:bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Heart className="text-red-500 h-7 w-7" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">DonateHope</span>
                    </div>
                    <Link
                        href="/donate"
                        className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                        Donate Now
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        Make a Difference Through Giving
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Your generosity has the power to transform lives. Be part of a mission that matters and
                        contribute to causes that count.
                    </p>
                    <button
                        onClick={() => router.push("/donate")}
                        className="cursor-pointer bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                        Donate Now
                    </button>

                    {/* Dashboard Cards */}
                    {dashboardData && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-8">
                            {/* Total Donations Card */}
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <BadgeDollarSign className="h-6 w-6 text-blue-500" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Donations</h3>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">Tk.{dashboardData.total}</p>
                            </div>

                            {/* Donors Card */}
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="h-6 w-6 text-green-500" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Donors</h3>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardData.donors}</p>
                            </div>

                            {/* Today's Donations Card */}
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="h-6 w-6 text-purple-500" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Donations</h3>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">Tk.{dashboardData.today}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"
                        alt="Donation Box"
                        className="rounded-xl shadow-xl w-full object-cover"
                    />
                </div>
            </section>
        </div>
    );
}