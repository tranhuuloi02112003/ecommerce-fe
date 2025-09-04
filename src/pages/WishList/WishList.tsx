import React from "react";
import { mockProducts } from "@/mock/products";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/pages/Home/components/SectionHeader";
import Button from "@/components/Button";

const WishList: React.FC = () => {
  const wishlistProducts = mockProducts.slice(0, 4);

  const handleRemoveFromWishlist = (id: string) => {
    console.log(`Removing product ${id} from wishlist`);
  };

  const handleMoveAllToBag = () => {
    console.log("Moving all items to bag");
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
              showRemove={true}
              onRemove={handleRemoveFromWishlist}
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WishList;
