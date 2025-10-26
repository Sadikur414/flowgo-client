import feature1 from "../../../assets/live-tracking.png";
import feature2 from "../../../assets/safe-delivery.png";
import feature3 from "../../../assets/live-tracking.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: feature1,
  },
  {
    title: "Secure OTP Delivery",
    description:
      "Ensure your parcels are delivered securely with OTP verification at the recipient’s end. Safety and reliability guaranteed for every shipment.",
    image: feature2,
  },
  {
    title: "Nationwide Coverage",
    description:
      "Deliveries to all 64 districts with a transparent commission structure. We ensure fast and reliable service across Bangladesh.",
    image: feature3,
  },
];

const Benifit = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div data-aos="fade-right" className="max-w-7xl mx-auto px-6 space-y-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Left Image */}
            <div className="w-full lg:w-1/3 flex justify-center items-center p-6 lg:p-10 relative">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto object-contain rounded-2xl"
              />

              {/* Vertical Divider for large screens */}
              <div className="hidden lg:block absolute top-8 bottom-8 right-0 w-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-2/3 p-6 lg:p-10 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-[#03373D] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benifit;
