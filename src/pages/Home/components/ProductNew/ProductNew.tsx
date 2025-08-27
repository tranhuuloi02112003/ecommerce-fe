import { Link } from "react-router-dom";

interface ProductNewProps {
  title: string;
  desc: string;
  img: string;
  link: string;
  className?: string;
}

const ProductNew = ({
  title,
  desc,
  img,
  link,
  className = "",
}: ProductNewProps) => {
  return (
    <div
      className={`relative bg-black/90 text-white rounded-[4px] group cursor-pointer ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-[25px] h-full w-[80%] max-w-[330px] flex flex-col justify-end">
        <div className="space-y-2">
          <h3 className="font-inter text-[24px] font-semibold tracking-[0.72px]">
            {title}
          </h3>
          <p className="text-[14px]">{desc}</p>
          <Link
            to={link}
            className="inline-block underline decoration-1 underline-offset-2 mt-3"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
