import { Heart, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="min-h-screen ">
            {/* Navbar */}
            <nav className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Heart className="h-8 w-8 text-red-500" />
                            <span className="ml-2 text-xl font-bold">DonateHope</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {/* <a href="#" className="text-foreground/80 hover:text-foreground">Home</a>
                            <a href="#" className="text-foreground/80 hover:text-foreground">About</a>
                            <a href="#" className="text-foreground/80 hover:text-foreground">Causes</a>
                            <a href="#" className="text-foreground/80 hover:text-foreground">Contact</a> */}
                            <Link href={"/donate"}
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 bg-gray-800 text-white hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                                Donate Now
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-foreground"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4">
                            <div className="flex flex-col space-y-4">
                                <a href="#" className="text-foreground/80 hover:text-foreground">Home</a>
                                <a href="#" className="text-foreground/80 hover:text-foreground">About</a>
                                <a href="#" className="text-foreground/80 hover:text-foreground">Causes</a>
                                <a href="#" className="text-foreground/80 hover:text-foreground">Contact</a>
                                <Link href={"/donate"}
                                    className="bg-gray-800 text-white hover:text-white rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                            Make a Difference Through Giving
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Your generosity can change lives. Join us in our mission to create positive impact
                            through meaningful donations that reach those who need it most.
                        </p>
                        <div className="space-y-4">
                            <button onClick={() => router.push("/donate")}
                                className=" bg-gray-800 text-white hover:text-black cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                                Donate Now
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"
                            alt="Donation Box"
                            className="rounded-lg shadow-2xl w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}