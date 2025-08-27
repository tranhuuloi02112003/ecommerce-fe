import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import FlashSaleSection from "./FlashSale/FlashSale";
import PromoBanner from "./PromoBanner/PromoBanner";
import SellingProduct from "./SellingProduct/SellingProduct";

const HomePage = () => {
  return (
    <>
      <FlashSaleSection />
      <BrowseByCategory />
      <SellingProduct />
      <PromoBanner />
    </>
  );
};

export default HomePage;
