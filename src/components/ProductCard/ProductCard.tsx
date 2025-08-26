import type { Product } from "../../types/product";
import { wishListIcon } from "@/assets/icons";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
};

const ProductCard = ({
  product,
  onAddToCart,
  onWishlistToggle,
}: ProductCardProps) => {
  const {
    id,
    name,
    image,
    price,
    oldPrice,
    discount,
    rating,
    reviewCount,
    isNew,
  } = product;
  return (
    <div className="cursor-pointer w-[270px] h-[350px]">
      {/* Image */}
      <div className="flex items-center justify-center bg-[#F5F5F5] relative w-full h-[250px] p-[20px]">
        {discount && (
          <span className="absolute top-[12px] text-center text-[12px] left-[12px] h-[22px] w-[56px] bg-red-500 text-white  px-3 py-1 rounded">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-[12px] text-center text-[12px] left-[12px] h-[22px] w-[56px] text-white  px-3 py-1 rounded bg-green-500">
            New
          </span>
        )}
        <span className="flex items-center justify-center absolute top-[12px] right-[12px] p-3 rounded-full bg-white shadow-sm">
          <img src={wishListIcon} alt="Favourite Icon" className="size-6" />
        </span>

        <img
          src={image}
          alt={name}
          className="bg-[#F5F5F5] w-full h-40 object-contain "
        />
      </div>

      {/* Info */}
      <div className="mt-[16px]">
        <h3 className="text-[16px] font-normal">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#DB4444] font-medium">${price}</span>
          {oldPrice && (
            <span className="ml-3 text-black opacity-50 line-through">
              ${oldPrice}
            </span>
          )}
        </div>
        {rating && (
          <div className="flex items-center mt-2">
            {/* Stars */}
            <div className="ml-2 text-yellow-400 text-sm">
              {"★".repeat(Math.floor(rating))}
              {"☆".repeat(5 - Math.floor(rating))}
            </div>
            {/* Rating number */}
            <span className="ml-2 text-black opacity-50 text-xs">
              {rating.toFixed(1)}
            </span>
            {/* Review count */}
            {reviewCount && (
              <span className="ml-2 text-black opacity-50 text-xs">
                ({reviewCount})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
