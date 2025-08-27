import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import FlashSaleSection from "./FlashSale/FlashSale";
import PromoBanner from "./PromoBanner/PromoBanner";
import SellingProduct from "./SellingProduct/SellingProduct";
import ExploreProducts from "./ExploreProducts/ExploreProduct";

const HomePage = () => {
  return (
    <>
      <FlashSaleSection />
      <BrowseByCategory />
      <SellingProduct />
      <PromoBanner />
      <ExploreProducts />
    </>
  );
};

export default HomePage;
