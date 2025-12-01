import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const MyEarning = () => {
    const AxiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // ---- Fetch Earning Summary ----
    const { data: summary = {}, isLoading } = useQuery({
        queryKey: ["earnings-summary", user?.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(
                `/rider/earnings-summary?riderEmail=${user.email}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p>Loading earning summary...</p>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-5">My Earnings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Pending Money */}
                <div className="p-5 shadow rounded bg-yellow-100 border">
                    <h3 className="text-lg font-semibold">Pending Money</h3>
                    <p className="text-2xl font-bold text-yellow-700">
                        {summary.pending} ৳
                    </p>
                </div>

                {/* Cashed Out */}
                <div className="p-5 shadow rounded bg-green-100 border">
                    <h3 className="text-lg font-semibold">Cashed Out</h3>
                    <p className="text-2xl font-bold text-green-700">
                        {summary.cashedOut} ৳
                    </p>
                </div>

                {/* Today */}
                <div className="p-5 shadow rounded bg-blue-100 border">
                    <h3 className="text-lg font-semibold">Today’s Earning</h3>
                    <p className="text-2xl font-bold text-blue-700">
                        {summary.todayEarning} ৳
                    </p>
                </div>

                {/* This Week */}
                <div className="p-5 shadow rounded bg-purple-100 border">
                    <h3 className="text-lg font-semibold">This Week</h3>
                    <p className="text-2xl font-bold text-purple-700">
                        {summary.weekEarning} ৳
                    </p>
                </div>

                {/* This Month */}
                <div className="p-5 shadow rounded bg-indigo-100 border">
                    <h3 className="text-lg font-semibold">This Month</h3>
                    <p className="text-2xl font-bold text-indigo-700">
                        {summary.monthEarning} ৳
                    </p>
                </div>

                {/* This Year */}
                <div className="p-5 shadow rounded bg-red-100 border">
                    <h3 className="text-lg font-semibold">This Year</h3>
                    <p className="text-2xl font-bold text-red-700">
                        {summary.yearEarning} ৳
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyEarning;
