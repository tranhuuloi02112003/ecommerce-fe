interface HeroSlideProps {
  icon?: string;
  smallTitle?: string;
  title: string;
  ctaText?: string;
  image: string;
  bgColor?: string;
}

const HeroSlide = ({
  icon,
  smallTitle,
  title,
  ctaText = "Shop Now →",
  image,
  bgColor = "bg-black",
}: HeroSlideProps) => {
  return (
    <div className={`flex items-center justify-between w-full h-full px-[64px] ${bgColor}`}>
      {/*  Left text */}
      <div className="text-[#fafafa] max-w-md space-y-4">
        {smallTitle && (
          <p className="flex items-center text-lg mb-[20px]">
            {icon && (
              <img className="w-[40px] h-[49px]" src={icon} alt="Icon" />
            )}
            <span className="ml-2">{smallTitle}</span>
          </p>
        )}
        <h2 className="font-inter mb-[22px] tracking-[1.92px] text-[42px] font-semibold leading-tight">
          {title}
        </h2>
        <button className="flex items-center gap-2 border-b border-white hover:text-gray-300">
          {ctaText}
        </button>
      </div>
      {/*  Right image */}
      <div className="flex-1 flex justify-center">
        <img src={image} alt="Banner" className="h-full object-cover" />
      </div>
    </div>
  );
};

export default HeroSlide;
