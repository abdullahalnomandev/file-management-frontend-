import MainBanner from "./Banner";
import Banner from "./Banner";
import PowerFullFeture from "./PowerFullFeture";
import Pricing from "./Pricing";


const HomePage = async () => {
  return (
    <>
      <Banner />
      <Pricing />
      <PowerFullFeture />
    </>
  );
}

export default HomePage;