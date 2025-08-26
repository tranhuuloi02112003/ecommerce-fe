import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/ProductCard";
import { mockProductsFlashSale } from "@/mock/products";
import "swiper/css";
import "swiper/css/pagination";

import Countdown from "@/components/Countdown/Countdown";
import Button from "@/components/Button";

const targetTime =
  Date.now() + 3 * 86_400_000 + 23 * 3_600_000 + 19 * 60_000 + 56 * 1_000;

const FlashSaleSection = () => {
  return (
    <section className="app-container mx-2">
      {/* === Header Section === */}
      <div className="flex items-center gap-2 mb-8">
        <span className="h-10 w-5 rounded-sm bg-primary" />
        <span className="ml-4 text-primary font-extrabold">Today's</span>
      </div>
      <div className="flex items-center justify-between">
        {/* Left: Title + Countdown */}
        <div className="flex items-center gap-20">
          <h2 className="text-[36px] font-extrabold">Flash Sales</h2>
          <Countdown target={targetTime} />
        </div>

        {/* Right: Navigation Arrows */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="flash-prev size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 cursor-pointer">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              className="flash-next size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              aria-label="Next"
            >
              {/* chevron-right */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* === Swiper Section === */}
      <div className="mt-6 max-w-none overflow-visible -mr-[calc(var(--container-padding))] w-[calc(100vw-((100vw-var(--container-max-width))/2)-var(--container-padding))]">
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
          {mockProductsFlashSale.map((p) => (
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
    </section>
  );
};

export default FlashSaleSection;
