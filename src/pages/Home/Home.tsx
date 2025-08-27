import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import FlashSaleSection from "./FlashSale/FlashSale";
import SellingProduct from "./SellingProduct/SellingProduct";

const HomePage = () => {
  return (
    <>
      <FlashSaleSection />
      <BrowseByCategory />
      <SellingProduct />
    </>
  );
};

export default HomePage;
