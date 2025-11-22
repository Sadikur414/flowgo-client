import { useForm } from "react-hook-form";
import { useState } from "react";
import riderImage from "../../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function BeARider() {
    const coverageArea = useLoaderData();
    const { user } = useAuth();
    const AxiosSecure = useAxiosSecure();

    const [selectedRegion, setSelectedRegion] = useState("");
    const [availableAreas, setAvailableAreas] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // Handle region selection dynamically
    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);
        const matchedRegion = coverageArea.find((area) => area.region === region);
        setAvailableAreas(matchedRegion ? matchedRegion.covered_area : []);
    };

    // Form submission
    const onSubmit = async (data) => {
        if (parseInt(data.age) < 15) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Age",
                text: "Age must be 15 or older to apply.",
                confirmButtonColor: "#CAEB66",
            });
            return;
        }

        const riderData = {
            ...data,
            status: "pending",
            name: user?.displayName,
            email: user?.email,
            submittedAt: new Date().toISOString(), // submission time (UTC)
        };

        try {
            const res = await AxiosSecure.post("/riders", riderData);
            console.log("Rider submitted:", res.data);

            Swal.fire({
                icon: "success",
                title: "Application Submitted!",
                text: "Your application has been submitted successfully!",
                confirmButtonColor: "#CAEB66",
            });

            reset();
        } catch (error) {
            console.error("Error submitting:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#CAEB66",
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-gray-50 min-h-screen">
            {/* Left: Form */}
            <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Become a Rider
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            disabled
                            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Age</label>
                        <input
                            type="number"
                            {...register("age", {
                                required: "Age is required",
                                min: { value: 15, message: "Age must be at least 15" },
                            })}
                            placeholder="Enter your age"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm">{errors.age.message}</p>
                        )}
                    </div>

                    {/* Region */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            Select Region
                        </label>
                        <select
                            {...register("region", { required: "Region is required" })}
                            onChange={handleRegionChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        >
                            <option value="">-- Select a Region --</option>
                            {[...new Set(coverageArea.map((area) => area.region))].map(
                                (region, i) => (
                                    <option key={i} value={region}>
                                        {region}
                                    </option>
                                )
                            )}
                        </select>
                        {errors.region && (
                            <p className="text-red-500 text-sm">{errors.region.message}</p>
                        )}
                    </div>
                    {/* District */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            District
                        </label>
                        <select
                            {...register("district", { required: "District is required" })}
                            disabled={!selectedRegion}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">-- Select a District --</option>

                            {/* District list from coverageArea based on region */}
                            {coverageArea
                                .filter((area) => area.region === selectedRegion)
                                .map((area, i) => (
                                    <option key={i} value={area.district}>
                                        {area.district}
                                    </option>
                                ))}
                        </select>

                        {errors.district && (
                            <p className="text-red-500 text-sm">{errors.district.message}</p>
                        )}
                    </div>


                    {/* NID */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            NID Number
                        </label>
                        <input
                            type="text"
                            {...register("nid", { required: "NID number is required" })}
                            placeholder="Enter your NID number"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.nid && (
                            <p className="text-red-500 text-sm">{errors.nid.message}</p>
                        )}
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            {...register("contact", {
                                required: "Contact number is required",
                            })}
                            placeholder="Enter your contact number"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.contact && (
                            <p className="text-red-500 text-sm">{errors.contact.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 font-semibold rounded-lg transition-all disabled:opacity-60"
                        style={{
                            backgroundColor: "#CAEB66",
                            color: "black",
                        }}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>

            {/* Right: Image */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                    src={riderImage}
                    alt="Be a Rider"
                    className="max-w-full h-auto rounded-xl shadow-lg"
                />
            </div>
        </div>
    );
}
