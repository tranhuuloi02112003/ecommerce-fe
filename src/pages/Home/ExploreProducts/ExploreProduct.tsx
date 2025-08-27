import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

import SectionHeader from "../components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/mock/products";
import Button from "@/components/Button";


const ExploreProducts = () => {
  return (
    <section className="app-container pt-[75px]">
      <div className="border-b border-black/30 pb-[70px]">
        {/* === Header Section === */}
        <SectionHeader
          label="Our Products"
          title="Explore Our Products"
          rightSlot={
            <div className="flex gap-2">
              <button className="explore-prev size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200">
                ←
              </button>
              <button className="explore-next size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200">
                →
              </button>
            </div>
          }
        />

        {/* === Swiper Section === */}
        <div className="mt-[40px] overflow-hidden">
          <Swiper
            modules={[Navigation, Grid]}
            navigation={{ prevEl: ".explore-prev", nextEl: ".explore-next" }}
            spaceBetween={25}
            slidesPerView={4}
            grid={{ rows: 2, fill: "row" }}
            className="explore-swiper"
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 3, spaceBetween: 13 },
              640: { slidesPerView: 3, spaceBetween: 17 },
              768: { slidesPerView: 4, spaceBetween: 21 },
              1024: { slidesPerView: 4, spaceBetween: 25 },
            }}
          >
            {mockProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* === View All Button === */}
        <div className="mt-10 text-center">
          <Button className="w-[234px]">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreProducts;
