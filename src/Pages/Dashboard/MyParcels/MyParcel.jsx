import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const parcels = Array.isArray(data) ? data : data?.parcels || [];

  const handlePay =(id)=>{
     navigate(`/dashboard/payment/${id}`)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosSecure.delete(`/parcels/${id}`);
          Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          refetch(); // refetch parcels after deletion
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading parcels...</div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Parcels</h2>

      {parcels.length === 0 ? (
        <p className="text-gray-600">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">#</th>
                <th className="border p-3 text-left">Type</th>
                <th className="border p-3 text-left">Cost</th>
                <th className="border p-3 text-left">Created</th>
                <th className="border p-3 text-left">Payment</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3 capitalize">{parcel.type}</td>
                  <td className="border p-3">${parcel.delivery_cost}</td>
                  <td className="border p-3">{parcel.creation_date}</td>
                  <td
                    className={`border p-3 font-semibold ${
                      parcel.payment_status === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {parcel.payment_status}
                  </td>
                  <td className="border p-3 flex gap-2 flex-wrap">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                      View Details
                    </button>

                    {parcel.payment_status === "unpaid" && (
                      <button  onClick={() => handlePay(parcel._id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                        Pay
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Delete
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

export default MyParcel;
