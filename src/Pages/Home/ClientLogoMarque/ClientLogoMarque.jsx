import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start.png";
import logo7 from "../../../assets/brands/start-people 1.png";
import Marquee from "react-fast-marquee";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoMarque = () => {
  return (
    <section className="py-16 bg-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          We've helped thousands of sales teams
        </h2>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden relative">
        <Marquee className="flex  gap-12">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-6 mr-12 object-contain"
            />
          ))}
          {/* Repeat logos for seamless scrolling */}
          {logos.map((logo, index) => (
            <img
              key={index + logos.length}
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-6 mr-12 object-contain"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ClientLogoMarque;
