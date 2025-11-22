import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
    const AxiosSecure = useAxiosSecure();
    const [query, setQuery] = useState("");

    // ===========================
    //  SEARCH USERS
    // ===========================
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["search-users", query],
        enabled: false,
        queryFn: async () => {
            const res = await AxiosSecure.get(`/users/search?query=${query}`);
            return res.data.users || [];
        },
    });

    const handleSearch = () => {
        if (!query.trim()) {
            return Swal.fire("Oops!", "Please enter an email to search.", "warning");
        }
        refetch();
    };

    // ===========================
    //  MAKE ADMIN MUTATION
    // ===========================
    const makeAdminMutation = useMutation({
        mutationFn: async (email) => {
            return await AxiosSecure.patch(`/users/make-admin/${email}`);
        },
        onSuccess: (data) => {
            Swal.fire("Success!", data.data.message, "success");
            refetch();
        },
        onError: () => {
            Swal.fire("Error!", "Failed to make admin", "error");
        },
    });

    // ===========================
    //  REMOVE ADMIN MUTATION
    // ===========================
    const removeAdminMutation = useMutation({
        mutationFn: async (email) => {
            return await AxiosSecure.patch(`/users/remove-admin/${email}`);
        },
        onSuccess: (data) => {
            Swal.fire("Success!", data.data.message, "success");
            refetch();
        },
        onError: () => {
            Swal.fire("Error!", "Failed to remove admin", "error");
        },
    });

    const handleMakeAdmin = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Make ${email} an admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin",
        }).then((result) => {
            if (result.isConfirmed) {
                makeAdminMutation.mutate(email);
            }
        });
    };

    const handleRemoveAdmin = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Remove admin role from ${email}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Remove Admin",
        }).then((result) => {
            if (result.isConfirmed) {
                removeAdminMutation.mutate(email);
            }
        });
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center mb-5">Manage Admins</h1>

            {/* Search Box */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Search user by email"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </div>

            {/* Search Results */}
            <div className="mt-5">
                {isLoading && <p className="text-center text-gray-500">Loading...</p>}

                {!isLoading && users.length === 0 && (
                    <p className="text-center text-gray-500">No users found</p>
                )}

                {users.map((user) => (
                    <div
                        key={user._id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3"
                    >
                        {/* LEFT SIDE: email + role */}
                        <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-gray-600">
                                Role: <span className="font-semibold">{user.role}</span>
                            </p>
                        </div>

                        {/* RIGHT SIDE: admin buttons */}
                        {user.role === "admin" ? (
                            <button
                                onClick={() => handleRemoveAdmin(user.email)}
                                className="bg-red-600 text-white px-3 py-1 rounded-lg"
                            >
                                {removeAdminMutation.isPending &&
                                removeAdminMutation.variables === user.email
                                    ? "Removing..."
                                    : "Remove Admin"}
                            </button>
                        ) : (
                            <button
                                onClick={() => handleMakeAdmin(user.email)}
                                className="bg-green-600 text-white px-3 py-1 rounded-lg"
                            >
                                {makeAdminMutation.isPending &&
                                makeAdminMutation.variables === user.email
                                    ? "Processing..."
                                    : "Make Admin"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeAdmin;
