import Banner from "../Banner/Banner";
import BeMerchant from "../BeMerchant/BeMerchant";
import Benifit from "../Benifit/Benifit";
import ClientLogoMarque from "../ClientLogoMarque/ClientLogoMarque";
import Services from "../services/Services";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogoMarque></ClientLogoMarque>
      <Benifit></Benifit>
      <BeMerchant></BeMerchant>
    </div>
  );
};

export default Home;
