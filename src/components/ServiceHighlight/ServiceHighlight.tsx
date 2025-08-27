import ServiceItem from "./ServiceItem";
import { CarIcon, HeadPhoneIcon, RefundIcon } from "../icons";

const ServiceHighlight = () => {
  return (
    <section className="app-container py-20 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[70px] lg:gap-[88px]">
        <ServiceItem
          icon={<CarIcon />}
          title="FREE AND FAST DELIVERY"
          desc="Free delivery for all orders over $140"
        />

        <ServiceItem
          icon={<HeadPhoneIcon />}
          title="24/7 CUSTOMER SERVICE"
          desc="Friendly 24/7 customer support"
        />

        <ServiceItem
          icon={<RefundIcon />}
          title="MONEY BACK GUARANTEE"
          desc="We return money within 30 days"
        />
      </div>
    </section>
  );
};

export default ServiceHighlight;
