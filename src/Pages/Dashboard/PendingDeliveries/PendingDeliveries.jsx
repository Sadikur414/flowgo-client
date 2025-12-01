import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PendingDeliveries = () => {
    const AxiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // ---------------- Fetch parcels for this rider ----------------
    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ["rider-parcels", user?.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(
                `/rider/parcels?riderEmail=${user.email}`
            );
            return res.data.parcels;
        },
        enabled: !!user?.email,
    });

    // ---------------- Update Parcel Status ----------------
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await AxiosSecure.patch(`/rider/parcels/status/${id}`, {
                delivery_status: newStatus,
            });

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: res.data.message,
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update delivery status",
            });
        }
    };

    if (isLoading) return <p>Loading parcels...</p>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Pending Deliveries</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th>SI</th>
                            <th>Parcel Name</th>
                            <th>Receiver</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">
                                <td>{index + 1}</td>
                                <td>{parcel.name}</td>
                                <td>{parcel.receiverName}</td>
                                <td>{parcel.receiverContact}</td>
                                <td className="font-medium">{parcel.delivery_status}</td>

                                <td>
                                    {parcel.delivery_status === "assign_rider" && (
                                        <button
                                            onClick={() => handleStatusUpdate(parcel._id, "in_transit")}
                                            className="btn btn-sm bg-blue-500 text-white"
                                        >
                                            Mark Picked Up
                                        </button>
                                    )}

                                    {parcel.delivery_status === "in_transit" && (
                                        <button
                                            onClick={() => handleStatusUpdate(parcel._id, "delivered")}
                                            className="btn btn-sm bg-green-600 text-white"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-gray-500">
                                    No pending or in-transit deliveries.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingDeliveries;
