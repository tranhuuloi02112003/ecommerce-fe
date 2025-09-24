import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

import SectionHeader from "../components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";
import routes from "@/config/routes";
import { useEffect, useState } from "react";
import { productsApi } from "@/services/productsApi";
import { cartApi } from "@/services/cartApi";
import type { ProductHomeResponse } from "@/types/product";
import Button from "@/components/Button";
import { toast } from "react-toastify";

const ExploreProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductHomeResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productsApi.getExploreProducts();
        setProducts(res);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="app-container py-[75px]">
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
          {loading ? (
            <div className="col-span-4 row-span-2 flex items-center justify-center min-h-[200px]">
              Loading...
            </div>
          ) : Array.isArray(products) && products.length === 0 ? (
            <div className="col-span-4 row-span-2 flex items-center justify-center min-h-[200px]">
              No products found.
            </div>
          ) : Array.isArray(products) ? (
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={async (id) => {
                    try {
                      await cartApi.addToCart(id);
                      toast.success("Added to cart!");
                    } catch (err) {
                      toast.error(
                        err instanceof Error
                          ? err.message
                          : "Add to cart failed"
                      );
                    }
                  }}
                  onCardClick={() =>
                    navigate(routes.productDetail.replace(":id", product.id))
                  }
                />
              </SwiperSlide>
            ))
          ) : null}
        </Swiper>
      </div>

      {/* === View All Button === */}
      <div className="mt-10 text-center">
        <Button className="w-[234px]">View All Products</Button>
      </div>
    </section>
  );
};

export default ExploreProducts;
