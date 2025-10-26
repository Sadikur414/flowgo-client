import service1 from "../../../assets/service.png";
import service2 from "../../../assets/service.png";
import service3 from "../../../assets/service.png";
import service4 from "../../../assets/service.png";
import service5 from "../../../assets/service.png";
import service6 from "../../../assets/service.png";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: service1,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: service2,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: service3,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: service4,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: service5,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: service6,
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-[#03373D]">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl font-bold text-[#CAEB66] mb-3">Our Services</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-20">
        {servicesData.map((service, index) => (
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            key={index}
            className="card bg-white border border-gray-100 shadow-md hover:bg-[#CAEB66] transition-all duration-300 group h-full flex flex-col justify-center items-center text-center p-8 rounded-2xl"
          >
            <div className="bg-gray-100 rounded-full p-4 mb-4 w-20 h-20 flex items-center justify-center group-hover:bg-white transition">
              <img
                src={service.icon}
                alt={service.title}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900">
              {service.title}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-700 text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
