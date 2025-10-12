import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsApi } from "@/services/productsApi";
import Button from "@/components/Button/Button";
import HeartIcon from "@/components/icons/HeartIcon";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<{
    id: string;
    name: string;
    description: string;
    price: number;
    images: { key: string; url: string }[];
  } | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getProductDetail(id);
        setProduct(data);
        setActiveImage(0);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="app-container py-10 text-center">Loading...</div>;
  }
  if (!product) {
    return null;
  }

  return (
    <div className="app-container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-20">
      <div className="lg:col-span-3 flex gap-6 h-[500px]">
        <div className="grid grid-rows-4 gap-5 w-63 h-full">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              className={`cursor-pointer border rounded-lg overflow-hidden transition-shadow duration-200
  ${
    activeImage === idx
      ? "shadow-lg shadow-red-200 border-red-200"
      : "border-gray-200"
  }`}
              onClick={() => setActiveImage(idx)}
            >
              <img
                src={img.url}
                alt={`thumbnail ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-lg overflow-hidden">
          <img
            src={product.images[activeImage].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-2">
        <h1 className="text-[24px] font-normal mb-2">{product.name}</h1>
        <p className="text-[24px] font-normal mb-4">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-black/50 rounded h-[44px]">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="h-full px-5 border-r border-black/50 flex items-center justify-center"
            >
              -
            </button>
            <span className="h-full w-[48px] flex items-center justify-center px-12">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="h-full px-5 border-l border-black/50 flex items-center justify-center"
            >
              +
            </button>
          </div>

          <Button variant="primary" className="w-[165px] !h-[44px]">
            Buy Now
          </Button>
          <button className="p-3 border rounded border-black/50 h-[44px] flex items-center justify-center hover:bg-gray-100">
            <HeartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
