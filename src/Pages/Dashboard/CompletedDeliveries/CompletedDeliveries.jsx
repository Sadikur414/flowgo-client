

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const CompletedDeliveries = () => {
    const AxiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // -------- Fetch completed deliveries (delivery_status = delivered) --------
    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ["completed-deliveries", user?.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(
                `/rider/completed-deliveries?riderEmail=${user.email}`
            );
            return res.data.parcels;
        },
        enabled: !!user?.email,
    });

    // -------- Cashout Handler --------
    const handleCashout = async (id) => {
        Swal.fire({
            title: "Cashout?",
            text: "Are you sure you want to cashout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cashout",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await AxiosSecure.patch(`/rider/cashout/${id}`, {
                        cashout_status: "cashed_out",
                    });

                    if (res.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Cashed Out!",
                            text: res.data.message,
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        refetch();
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        text: "Cashout failed",
                    });
                }
            }
        });
    };

    if (isLoading) return <p>Loading completed deliveries...</p>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Completed Deliveries</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th>SI</th>
                            <th>Parcel Name</th>
                            <th>Receiver</th>
                            <th>Delivery Cost</th>
                            <th>Rider Earn (80%)</th>
                            <th>Cashout Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => {
                            const riderEarn = parcel.delivery_cost * 0.8;

                            return (
                                <tr key={parcel._id} className="hover">
                                    <td>{index + 1}</td>
                                    <td>{parcel.name}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>{parcel.delivery_cost} ৳</td>
                                    <td className="font-semibold text-green-600">
                                        {riderEarn} ৳
                                    </td>

                                    <td className="font-medium">
                                        {parcel.cashout_status || "pending"}
                                    </td>

                                    <td>
                                        {parcel.cashout_status === "cashed_out" ? (
                                            <button
                                                className="btn btn-sm bg-gray-400 text-white"
                                                disabled
                                            >
                                                Cashed Out
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleCashout(parcel._id)}
                                                className="btn btn-sm bg-purple-600 text-white"
                                            >
                                                Cashout
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}

                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-gray-500">
                                    No completed deliveries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;
