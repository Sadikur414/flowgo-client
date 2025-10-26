import image from "../../../assets/location-merchant.png";
const BeMerchant = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="hero bg-[#03373D] lg:h-[438px] rounded-2xl my-16"
    >
      <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between px-6 lg:px-16 py-10 lg:py-0">
        {/* Image Section */}
        <div className="flex justify-center w-full lg:w-1/2">
          <img
            src={image}
            alt="Courier delivery illustration"
            className="w-full max-w-md rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="text-[#DADADA] leading-relaxed text-sm sm:text-base lg:text-lg">
            We offer the lowest delivery charge with the highest value, ensuring
            100% product safety. Profast Courier delivers your parcels to every
            corner of Bangladesh — on time, every time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button className="btn bg-[#CAEB66] border-none text-[#03373D] font-semibold px-6 rounded-full hover:bg-[#badd4f] transition-all duration-300">
              Become a Merchant
            </button>
            <button className="btn border-2 border-[#CAEB66] bg-[#03373D] text-[#CAEB66] font-semibold px-6 rounded-full ">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
