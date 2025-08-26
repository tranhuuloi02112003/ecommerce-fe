import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { laptopBanner, phoneBanner } from "@/assets/images";
import { appleLogoIcon } from "@/assets/icons";
import HeroSlide from "./HeroSlide/HeroSlide";

const HeroBanner = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} !w-3 !h-3 !bg-gray-400 rounded-full inline-block"></span>`;
        },
      }}
      autoplay={{ delay: 3000 }}
      loop
      className="flex-1 min-h-[220px] rounded-xl overflow-hidden !ml-[45px]"
    >
      <SwiperSlide>
        <HeroSlide
          icon={appleLogoIcon}
          smallTitle="iPhone 14 Series"
          title="Up to 10% off Voucher"
          image={phoneBanner}
        />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlide
          smallTitle="New Collection"
          title="Special offer just for you"
          image={laptopBanner}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroBanner;
