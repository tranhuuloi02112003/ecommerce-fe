import FlashSaleSection from "./FlashSale/FlashSale";

const HomePage = () => {
  return (
    <div className="app-container py-8">
      <div className="p-6 rounded-lg shadow-sm flex items-center justify-center">
        <FlashSaleSection />
      </div>
    </div>
  );
};

export default HomePage;
