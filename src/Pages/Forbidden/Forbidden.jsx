import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-5xl font-bold text-red-600">403</h1>

            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                Access Forbidden
            </h2>

            <p className="text-gray-600 mt-2 text-center max-w-md">
                You don’t have permission to access this page.
                Please contact an administrator if you think this is a mistake.
            </p>

            <Link
                to="/"
                className="mt-6 px-5 py-2 bg-[#CAEB66] text-black rounded-md font-semibold hover:bg-[#B4D94E] transition"
            >
                Go to Home
            </Link>
        </div>
    );
}
