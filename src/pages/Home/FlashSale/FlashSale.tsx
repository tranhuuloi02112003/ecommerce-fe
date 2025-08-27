import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/mock/products";
import "swiper/css";

import Countdown from "@/components/Countdown/Countdown";
import Button from "@/components/Button";
import SectionHeader from "../components/SectionHeader";

const targetTime =
  Date.now() + 3 * 86_400_000 + 23 * 3_600_000 + 19 * 60_000 + 56 * 1_000;

const FlashSale = () => {
  return (
    <section className="app-container">
      <div className="border-b border-black/30 pb-[57px]">
        {/* === Header Section === */}
        <SectionHeader
          label="Today's"
          title="Flash Sales"
          countdown={<Countdown target={targetTime} />}
          rightSlot={
            <div className="flex gap-2">
              <button className="flash-prev size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200">
                ←
              </button>
              <button className="flash-next size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200">
                →
              </button>
            </div>
          }
        />

        {/* === Swiper Section === */}
        <div className="mt-6 max-w-none overflow-hidden -mr-[calc(var(--container-padding))] w-[calc(100dvw-((100dvw-var(--container-max-width))/2)-(var(--container-padding)*2))]">
          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: ".flash-prev", nextEl: ".flash-next" }}
            spaceBetween={25}
            loop
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              480: { slidesPerView: 1.5, spaceBetween: 9 },
              640: { slidesPerView: 2.2, spaceBetween: 14 },
              768: { slidesPerView: 2.5, spaceBetween: 18 },
              1024: { slidesPerView: 3.2, spaceBetween: 22 },
              1280: { slidesPerView: 4.3, spaceBetween: 25 },
            }}
          >
            {mockProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* === View All Button Section === */}
        <div className="flex justify-center mt-8">
          <Button variant="primary" className="px-[48px] py-[16px]">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
