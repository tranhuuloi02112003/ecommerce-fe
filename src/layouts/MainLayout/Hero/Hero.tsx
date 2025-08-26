import HeroBanner from "./HeroBanner";
import SidebarMenu from "./SidebarMenu";

const Hero = () => {
  return (
    <div className="app-container flex ">
      <SidebarMenu />
      <HeroBanner />
    </div>
  );
};

export default Hero;
