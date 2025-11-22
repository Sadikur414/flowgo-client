import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
  const AxiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const updateStatus = async (id, status, email) => {
    try {
      await AxiosSecure.patch(`/riders/${id}`, { status, email });
      refetch();

      //  SweetAlert2 popup
      Swal.fire({
        icon: "success",
        title: status === "active" ? "Rider Accepted!" : "Rider Rejected!",
        text:
          status === "active"
            ? "The rider has been successfully accepted."
            : "The rider has been successfully rejected.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update status:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update rider status. Please try again.",
      });
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-10 font-semibold text-gray-600">
        Loading pending riders...
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Pending Riders</h1>

      {riders.length === 0 ? (
        <p className="text-gray-500">No pending riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Region</th>
                <th className="p-3 border-b">Work Area</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{rider.name}</td>
                  <td className="p-3 border-b">{rider.email}</td>
                  <td className="p-3 border-b">{rider.region}</td>
                  <td className="p-3 border-b">{rider.work_area}</td>
                  <td className="p-3 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="text-blue-500 hover:text-blue-700"
                        title="View Details"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        onClick={() => updateStatus(rider._id, "active", rider.email)}
                        className="text-green-500 hover:text-green-700"
                        title="Accept Rider"
                      >
                        <FaCheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => updateStatus(rider._id, "rejected", rider.email)}
                        className="text-red-500 hover:text-red-700"
                        title="Reject Rider"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rider Details Modal */}
      {selectedRider && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-1/2 p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setSelectedRider(null)}
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Rider Details</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nid}
              </p>
              <p>
                <strong>Contact:</strong> {selectedRider.contact || "N/A"}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>Work Area:</strong> {selectedRider.work_area}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age}
              </p>
              <p>
                <strong>Status:</strong> <span className="capitalize">{selectedRider.status}</span>
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {selectedRider.submittedAt ? new Date(selectedRider.submittedAt).toLocaleString() : "N/A"}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedRider(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
