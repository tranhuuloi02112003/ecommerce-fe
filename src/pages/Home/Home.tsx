import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import FlashSaleSection from "./FlashSale/FlashSale";
import PromoBanner from "./PromoBanner/PromoBanner";
import SellingProduct from "./SellingProduct/SellingProduct";
import ExploreProducts from "./ExploreProducts/ExploreProduct";
import NewArrival from "./NewArrival/NewArrival"; 

const HomePage = () => {
  return (
    <>
      <FlashSaleSection />
      <BrowseByCategory />
      <SellingProduct />
      <PromoBanner />
      <ExploreProducts />
      <NewArrival />
    </>
  );
};

export default HomePage;
