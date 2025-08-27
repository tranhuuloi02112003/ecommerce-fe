interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const ServiceItem = ({ icon, title, desc }: ServiceItemProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon Container */}
      <div className="size-[80px] bg-[#2F2E30]/30 rounded-full flex items-center justify-center mb-6 relative">
        <div className="size-[56px] bg-black rounded-full flex items-center justify-center">
          <div className="size-[40px] flex items-center justify-center">
           {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-[5px]">
        <h3 className="text-[20px] font-semibold uppercase">
          {title}
        </h3>
        <p className="mt-[5px] text-[14px] font-normal">{desc}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
