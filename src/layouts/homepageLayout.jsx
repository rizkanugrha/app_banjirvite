// layouts/DashboardLayout.jsx
// eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CurrentDateTime from "../components/homepage/currentDateTime";
const homepageLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-orange-600 text-white py-4 px-6 flex justify-between items-center">
                <div className="text-xl font-bold">SIPABA - Sistem Informasi Pantauan Bencana By Rizka Nugraha</div>
                <div className="text-sm">
                    <CurrentDateTime />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-blue-900 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <Link
                                    to="/"
                                    className="block py-2 px-4 hover:bg-blue-700 rounded"
                                >
                                    Dashboard
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 bg-gray-100 p-6">{children}</main>
            </div>

            {/* Footer */}
            <footer className="bg-yellow-500 text-white text-center py-2 text-sm">
                &copy; 2025 Batang Digital Creative - All rights reserved
            </footer>
        </div>
    );
};

homepageLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default homepageLayout;
