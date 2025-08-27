import Countdown from "@/components/CountDown/CountDown";
import Button from "../../../components/Button";
import { promoBanner } from "@/assets/images";

const PromoBanner = () => {
  // Thời gian kết thúc sale (3 ngày từ bây giờ)
  const targetTime =
    Date.now() + 3 * 86_400_000 + 23 * 3_600_000 + 19 * 60_000 + 56 * 1_000;

  return (
    <section className="app-container pt-[75px] mb-[80px]">
      <div className="bg-black text-white flex items-center justify-between px-10 py-12">
        {/* Text */}
        <div className="mt-[55px] ml-[43px] mb-[55px] max-w-[45%]">
          <p className="text-[#0F6] size-[16px] font-semibold mb-[32px]">
            Categories
          </p>
          <h2 className="font-inter text-[48px] font-semibold leading-tight tracking-[1.92px] mb-6">
            Enhance Your <br /> Music Experience
          </h2>

          {/* Countdown */}
          <Countdown
            target={targetTime}
            className="gap-[24px]
                [&_.countdown-block]:bg-white [&_.countdown-block]:size-[64px] [&_.countdown-block]:rounded-full 
                [&_.countdown-value]:text-[16px] [&_.countdown-value]:font-semibold [&_.countdown-value]:text-black [&_.countdown-value]:order-1
                [&_.countdown-label]:text-[11px] [&_.countdown-label]:uppercase [&_.countdown-label]:text-black [&_.countdown-label]:tracking-wider [&_.countdown-label]:order-2
                [&_.separator]:hidden
              "
          />

          <Button variant="primary" className="!bg-[#0F6] w-[171px] mt-[40px]">
            Buy Now!
          </Button>
        </div>

        {/* Image */}
        <div className="ml-20 flex-1 flex justify-center">
          <div className="relative w-[80%] flex justify-center items-center">
            {/* Blur */}
            <div className="absolute inset-0 bg-gray-600 blur-[100px]" />
            <img
              src={promoBanner}
              alt="JBL Speaker"
              className="relative object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
