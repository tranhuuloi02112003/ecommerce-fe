import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { categories } from "@/mock/categories";
import CategoryCard from "./CategoryCard";
import "swiper/css";

import SectionHeader from "../components/SectionHeader";

type Category = {
  id: number;
  title: string;
  icon: string;
};

const BrowseByCategory = () => {
  return (
    <section className="app-container pt-[75px]">
      {/* === Header Section === */}
      <SectionHeader
        label="Categories"
        title="Browse By Category"
        rightSlot={
          <div className="flex gap-2">
            <button className="category-prev size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200">
              ←
            </button>
            <button className="category-next size-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200">
              →
            </button>
          </div>
        }
      />

      {/* === Swiper Section === */}
      <div className="overflow-hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".category-prev", nextEl: ".category-next" }}
          spaceBetween={20}
          slidesPerView="auto"
          loop
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 12 },
            480: { slidesPerView: 3, spaceBetween: 14 },
            640: { slidesPerView: 4, spaceBetween: 16 },
            768: { slidesPerView: 5, spaceBetween: 18 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {categories.map((category: Category) => (
            <SwiperSlide key={category.id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BrowseByCategory;
