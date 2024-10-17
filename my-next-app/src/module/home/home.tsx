import Header from "@/shared/widgets/header/header";
import Banner from "./elements/banner";
import Branding from "@/module/home/elements/branding";
import Benefits from "@/module/home/elements/benefits";
import FeatureHighlight from "@/module/home/elements/feature.highlight";
import Pricing from "@/module/home/elements/pricing";
import Footer from "@/shared/widgets/footer/footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Branding />
      <Benefits />
      <FeatureHighlight />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
