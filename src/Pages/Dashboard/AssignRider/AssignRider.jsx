import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRider = () => {
    const AxiosSecure = useAxiosSecure();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [successModal, setSuccessModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Fetch parcels
    const { data: parcels = [], isLoading, isError } = useQuery({
        queryKey: ["assign-rider-parcels"],
        queryFn: async () => {
            const res = await AxiosSecure.get(
                "/parcels?payment_status=paid&delivery_status=not collected"
            );
            return res.data.parcels;
        },
    });

    // Fetch Active Riders for the selected parcel's district
    const { data: riders = [], refetch: refetchRiders } = useQuery({
        queryKey: ["active-riders-by-district", selectedParcel?.senderDistrict],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await AxiosSecure.get(
                `/riders/by-district?district=${selectedParcel.senderDistrict}`
            );
            return res.data.riders;
        },
    });

    const handleAssignModal = (parcel) => {
        setSelectedParcel(parcel);
        setShowModal(true);
        refetchRiders();
    };

    const handleAssignRider = async (rider) => {
        try {
            const res = await AxiosSecure.patch(
                `/parcels/assign/${selectedParcel._id}`,
                {
                    riderId: rider._id,
                    riderName: rider.name,
                    riderContact: rider.contact,
                    riderEmail: rider.email,
                }
            );

            if (res.data.success) {
                setShowModal(false);
                setSelectedParcel(null);

                // open success modal
                setSuccessModal(true);
            }
        } catch (error) {
            console.error("Failed to assign rider", error);
        }
    };
    if (isLoading) return <p className="text-center py-10">Loading parcels...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load parcels</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Rider</h2>

            <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Sender Name</th>
                        <th className="p-2 border">Receiver Name</th>
                        <th className="p-2 border">Weight</th>
                        <th className="p-2 border">Cost</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {parcels.map((parcel) => (
                        <tr key={parcel._id}>
                            <td className="p-2 border">{parcel._id}</td>
                            <td className="p-2 border">{parcel.senderName}</td>
                            <td className="p-2 border">{parcel.receiverName}</td>
                            <td className="p-2 border">{parcel.weight} kg</td>
                            <td className="p-2 border">{parcel.delivery_cost} BDT</td>
                            <td className="p-2 border">{parcel.delivery_status}</td>
                            <td className="p-2 border text-center">
                                <button
                                    onClick={() => handleAssignModal(parcel)}
                                    className="bg-[#CAEB66] text-black px-4 py-1 rounded hover:bg-[#B5D33E]"
                                >
                                    Assign Rider
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-5 w-96 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-3">
                            Select Rider for: {selectedParcel?.senderDistrict}
                        </h3>

                        {riders.length === 0 ? (
                            <p className="text-red-500 text-center">No active riders found for this district</p>
                        ) : (
                            <div className="space-y-2">
                                {riders.map((rider) => (
                                    <div
                                        key={rider._id}
                                        className="border rounded p-3 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">{rider.name}</p>
                                            <p className="text-sm">District: {rider.district}</p>
                                        </div>

                                        <button
                                            onClick={() => handleAssignRider(rider)}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Assign
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            className="mt-4 w-full py-2 bg-gray-300 rounded"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {successModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
                        <h2 className="text-xl font-bold text-green-600 mb-3">
                            Rider Assigned Successfully!
                        </h2>

                        <p className="text-gray-700 mb-4">
                            The parcel has been assigned to the selected rider.
                        </p>

                        <button
                            className="bg-green-500 text-white w-full py-2 rounded"
                            onClick={() => {
                                setSuccessModal(false);
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
