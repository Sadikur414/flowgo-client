import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";

const AddParcelForm = () => {
  const data = useLoaderData(); // Your regions/districts data
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const navigate= useNavigate()

  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Update sender districts when sender region changes
  useEffect(() => {
    if (senderRegion) {
      const uniqueDistricts = data
        .filter((item) => item.region === senderRegion)
        .map((item) => item.district);
      setSenderDistricts(uniqueDistricts);
    } else {
      setSenderDistricts([]);
    }
  }, [senderRegion, data]);

  // Update receiver districts when receiver region changes
  useEffect(() => {
    if (receiverRegion) {
      const uniqueDistricts = data
        .filter((item) => item.region === receiverRegion)
        .map((item) => item.district);
      setReceiverDistricts(uniqueDistricts);
    } else {
      setReceiverDistricts([]);
    }
  }, [receiverRegion, data]);

  const onSubmit = async (formData) => {
    let totalCost = 0;

    // -------------------- Price Calculation --------------------
    if (formData.type === "document") {
      totalCost = formData.senderRegion === formData.receiverRegion ? 60 : 80;
    } else {
      const weight = parseFloat(formData.weight) || 0;
      if (weight <= 3) {
        totalCost =
          formData.senderRegion === formData.receiverRegion ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        if (formData.senderRegion === formData.receiverRegion) {
          totalCost = 110 + extraWeight * 40;
        } else {
          totalCost = 150 + extraWeight * 40 + 40;
        }
      }
    }

    // -------------------- SweetAlert Confirmation --------------------
    Swal.fire({
      title: "Delivery Cost Details",
      html: `
        <p><b>Parcel Type:</b> ${formData.type}</p>
        <p><b>Weight:</b> ${formData.weight || "Any"} kg</p>
        <p><b>From:</b> ${formData.senderRegion}</p>
        <p><b>To:</b> ${formData.receiverRegion}</p>
        <p class="text-lg mt-2"><b>Total Cost:</b> ৳${totalCost}</p>
      `,
      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#f59e0b",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          ...formData,
          delivery_cost: totalCost,
          payment_status: "unpaid",
          delivery_status: "not collected",
          creation_date: new Date().toLocaleString("en-BD", {
            timeZone: "Asia/Dhaka",
          }),
          user_email: user?.email || "unknown",
        };

        try {
          const res = await AxiosSecure.post("/parcels", payload);
          if (res.data?.insertedId || res.data?.success) {
            Swal.fire({
              title: "Success!",
              text: "Parcel information saved successfully!",
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
            reset();
  

            // *****************Redirect to my parcel page ******************
            navigate("/dashboard/myparcel");

          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to save parcel information.",
              icon: "error",
              confirmButtonColor: "#dc2626",
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while saving parcel.",
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        }
      }
    });
  };

  const uniqueRegions = [...new Set(data.map((item) => item.region))];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 my-10">
      <h1 className="text-3xl font-bold text-black text-center mb-8">
        Add Parcel
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("type", { required: true })}
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("type", { required: true })}
              />
              Non-document
            </label>
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm">Parcel type is required</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Parcel Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full border p-2 rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Parcel name is required</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">
                Parcel Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* Sender Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  {...register("senderName", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Contact (Phone Number)
                </label>
                <input
                  type="tel"
                  {...register("senderContact", {
                    required: true,
                    pattern: /^[0-9]{10,15}$/,
                  })}
                  className="w-full border p-2 rounded"
                  placeholder="Enter digits only"
                />
                {errors.senderContact && (
                  <p className="text-red-500 text-sm">
                    Valid phone number is required
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Region</label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">District</label>
                <select
                  {...register("senderDistrict", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select district</option>
                  {senderDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Address / Pickup Point
                </label>
                <textarea
                  {...register("senderAddress")}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Delivery Instructions
                </label>
                <textarea
                  {...register("senderInstructions")}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  {...register("receiverName", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Contact (Phone Number)
                </label>
                <input
                  type="tel"
                  {...register("receiverContact", {
                    required: true,
                    pattern: /^[0-9]{10,15}$/,
                  })}
                  className="w-full border p-2 rounded"
                  placeholder="Enter digits only"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 text-sm">
                    Valid phone number is required
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Region</label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">District</label>
                <select
                  {...register("receiverDistrict", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select district</option>
                  {receiverDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Address / Delivery Point
                </label>
                <textarea
                  {...register("receiverAddress")}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Delivery Instructions
                </label>
                <textarea
                  {...register("receiverInstructions")}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcelForm;
