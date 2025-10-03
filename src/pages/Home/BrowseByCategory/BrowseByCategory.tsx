import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { categories } from "@/mock/categories";
import CategoryCard from "./CategoryCard";
import "swiper/css";
import { useNavigate } from "react-router-dom";

import SectionHeader from "../components/SectionHeader";

type Category = {
  id: string | number;
  title: string;
  icon: string;
};

const BrowseByCategory = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId: string | number) => {
    navigate(`/category/${categoryId}`);
  };
  
  return (
    <section className="app-container pt-[75px]">
      <div className="border-b border-black/30 pb-[70px]">
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
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryCard 
                  category={category}
                  onClick={handleCategoryClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
