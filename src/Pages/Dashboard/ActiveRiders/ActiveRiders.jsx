import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const AxiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch active riders with TanStack Query
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Deactivate rider
  const handleDeactivate = async (id) => {
    try {
      await AxiosSecure.patch(`/riders/${id}`, { status: "pending" });
      refetch();

      Swal.fire({
        icon: "success",
        title: "Rider Deactivated!",
        text: "The rider has been successfully deactivated.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to deactivate rider:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to deactivate rider. Please try again.",
      });
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-10 font-semibold text-gray-600">
        Loading active riders...
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Active Riders</h1>

      {riders.length === 0 ? (
        <p className="text-gray-500">No active riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Region</th>
                <th className="p-3 border-b">District</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{rider.name}</td>
                  <td className="p-3 border-b">{rider.email}</td>
                  <td className="p-3 border-b">{rider.region}</td>
                  <td className="p-3 border-b">{rider.district}</td>
                  <td className="p-3 border-b">
                    <span className="px-3 py-1 rounded-full text-white bg-green-500 font-semibold text-sm">
                      {rider.status}
                    </span>
                  </td>
                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      title="Deactivate Rider"
                    >
                      <FaUserTimes /> Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
