import HeroBanner from "./HeroBanner";
import SidebarMenu from "./SidebarMenu";

const Hero = () => {
  return (
    <div className="app-container flex min-h-[220px] pt-[var(--spacing-hero-block)] mb-[140px]">
      <SidebarMenu />
      <HeroBanner />
    </div>
  );
};

export default Hero;
