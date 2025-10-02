import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/pages/Home/components/SectionHeader";
import Button from "@/components/Button";
import { wishApi } from "@/services/wishApi";
import type { ProductHomeResponse } from "@/types/product";
import { toast } from "react-toastify";

const WishList: React.FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<
    ProductHomeResponse[]
  >([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await wishApi.getUserWishlist();
        setWishlistProducts(data);
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Failed to fetch wishlist"
        );
        setWishlistProducts([]);
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlistChange = (id: string, isWished: boolean) => {
    if (!isWished) {
      setWishlistProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleMoveAllToBag = () => {
    console.log("Move all to bag clicked");
  };

  return (
    <div className="app-container pt-[40px] pb-[60px]">
      {/* Wishlist Section */}
      <section className="mb-[75px]">
        <SectionHeader
          titleClassName="text-[20px] font-normal"
          title={`Wishlist (${wishlistProducts.length})`}
          rightSlot={
            <Button
              variant="outline"
              className="w-[223px]"
              onClick={handleMoveAllToBag}
            >
              Move All To Bag
            </Button>
          }
        />

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-[60px]">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="wishlist"
              onWishlistChange={handleWishlistChange}
            />
          ))}
        </div>
      </section>

      {/* Just For You Section */}
      <section>
        <div className="flex items-center justify-between mb-[60px]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-10 w-5 rounded-sm bg-primary" />
              <span className={`ml-4 font-normal text-[20px]`}>
                Just For You
              </span>
            </div>
          </div>
          <div>
            <Button variant="outline" className="w-[150px]">
              See All
            </Button>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onWishlistChange={handleWishlistChange}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WishList;
