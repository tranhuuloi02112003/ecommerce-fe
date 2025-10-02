import React, { useState } from "react";
import type { ProductHomeResponse } from "../../types/product";
import { HeartIcon } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import routes from "@/config/routes";
import { cartApi } from "@/services/cartApi";
import { wishApi } from "@/services/wishApi";
import { toast } from "react-toastify";

type ProductCardProps = {
  product: ProductHomeResponse;
  variant?: "default" | "wishlist";
  onWishlistChange?: (id: string, isWished: boolean) => void;
};

const ProductCard = ({
  product,
  variant = "default",
  onWishlistChange,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const [isWished, setIsWished] = useState(!!product.wish);
  const [isProcessing, setIsProcessing] = useState(false);

  const openProductDetail = (id: string) => () =>
    navigate(routes.productDetail.replace(":id", id));

  const handleAddToCart = async (id: string) => {
    try {
      await cartApi.addToCart(id);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Add to cart failed");
    }
  };

  const handleWishlistAction = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!id || isProcessing) return;

    const wasWished = isWished;
    setIsWished(!wasWished);
    setIsProcessing(true);

    try {
      if (variant === "wishlist" || wasWished) {
        await wishApi.removeWish(id);
        toast.success("Removed from wishlist!");
      } else {
        await wishApi.addWish(id);
        toast.success("Added to wishlist!");
      }
      onWishlistChange?.(id, !wasWished);
    } catch (err) {
      setIsWished(wasWished);
      toast.error(
        err instanceof Error ? err.message : "Failed to update wishlist"
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const {
    id,
    name,
    mainImage,
    price,
    // oldPrice,
    // discount,
    // rating,
    // reviewCount,
    new: isNew,
  } = product;

  return (
    <div
      className="cursor-pointer w-[270px] h-[350px] group"
      onClick={openProductDetail(product.id)}
    >
      {/* Image */}
      <div className="flex items-center justify-center bg-[#F5F5F5] relative w-full h-[250px] p-[20px] rounded-lg">
        {/* {discount && (
          <span className="absolute top-[12px] text-center text-[12px] left-[12px] h-[22px] w-[56px] bg-red-500 text-white  px-3 py-1 rounded">
            -{discount}%
          </span>
        )} */}
        {isNew && (
          <span className="absolute top-[12px] text-center text-[12px] left-[12px] h-[22px] w-[56px] text-white  px-3 py-1 rounded bg-green-500">
            New
          </span>
        )}
        <button
          type="button"
          className="flex items-center justify-center absolute top-[12px] right-[12px] p-3 rounded-full bg-white shadow-sm
             hover:bg-gray-50 transition
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            if (!id) return;
            handleWishlistAction(e, id);
          }}
          disabled={isProcessing}
          aria-pressed={variant !== "wishlist" && isWished}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          title={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {variant === "wishlist" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="cursor-pointer hover:text-red-500"
            >
              <path
                d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143"
                stroke="currentColor"
                strokeWidth="1.56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </svg>
          ) : (
            <HeartIcon
              filled={isWished}
              className={`
                ${
                  isWished ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }
                ${isProcessing ? "opacity-50" : ""}
              `}
              aria-hidden="true"
            />
          )}
        </button>

        <img
          src={mainImage}
          alt={name}
          className="bg-[#F5F5F5] w-full h-40 object-contain "
        />

        <button
          className="absolute left-0 right-0 bottom-0 h-16 bg-black text-white font-medium text-[16px] rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ zIndex: 2 }}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleAddToCart(product.id);
          }}
        >
          Add To Cart
        </button>
      </div>

      {/* Info */}
      <div className="mt-[16px]">
        <h3 className="text-[16px] font-normal">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#DB4444] font-medium">${price}</span>
          {/* {oldPrice && (
            <span className="ml-3 text-black opacity-50 line-through">
              ${oldPrice}
            </span>
          )} */}
        </div>
        {/* {rating && (
          <div className="flex items-center mt-2">
            <div className="ml-2 text-yellow-400 text-sm">
              {"★".repeat(Math.floor(rating))}
              {"☆".repeat(5 - Math.floor(rating))}
            </div>
            <span className="ml-2 text-black opacity-50 text-xs">
              {rating.toFixed(1)}
            </span>
            {reviewCount && (
              <span className="ml-2 text-black opacity-50 text-xs">
                ({reviewCount})
              </span>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductCard;
