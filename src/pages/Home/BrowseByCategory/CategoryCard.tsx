type CategoryCardProps = {
  category: {
    id: number;
    title: string;
    icon: string;
  };
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { title, icon } = category;
  return (
    <div
      className={
        "flex flex-col items-center justify-center bg-white border border-black/30 rounded-[4px] cursor-pointer transition-shadow hover:shadow-md hover:border-gray-300 w-[170px] h-[145px] shrink-0"
      }
    >
      <img
        src={icon}
        alt={title}
        className="size-[56px] mb-[16px] object-contain"
      />
      <span className="text-[16px] font-normal text-black">{title}</span>
    </div>
  );
};

export default CategoryCard;
