import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Shield, Search } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: "HOME", path: "/" },
        { name: "MATCHUPS", path: "/matchups" },
        { name: "FAMOUS FIGHTS", path: "/fights" },
        { name: "THE ARSENAL", path: "/arsenal" },
        { name: "POUND-FOR-POUND", path: "/rankings" },
    ];

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md z-50 border-b border-white/10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2 text-white font-black tracking-widest text-lg">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span>VANGUARD<span className="text-red-500">.</span>COMBAT</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-xs uppercase font-bold tracking-wider transition-colors duration-200 relative py-1 ${
                                isActive(item.path)
                                    ? "text-red-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-500"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right quick tools & Mobile toggle */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/rankings"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-600/20 transition-all"
                    >
                        <span>LIVE P4P</span>
                    </Link>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-4 space-y-3">
                    {navLinks.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 text-sm font-semibold tracking-wider ${
                                isActive(item.path) ? "text-red-500" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
