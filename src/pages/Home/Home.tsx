import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import FlashSaleSection from "./FlashSale/FlashSale";
import PromoBanner from "./PromoBanner/PromoBanner";
import SellingProduct from "./SellingProduct/SellingProduct";
import ExploreProducts from "./ExploreProducts/ExploreProduct";
import NewArrival from "./NewArrival/NewArrival"; 
import ServiceHighlight from "../../components/ServiceHighlight/ServiceHighlight";

const HomePage = () => {
  return (
    <>
      <FlashSaleSection />
      <BrowseByCategory />
      <SellingProduct />
      <PromoBanner />
      <ExploreProducts />
      <NewArrival />
      <ServiceHighlight/>
    </>
  );
};

export default HomePage;
