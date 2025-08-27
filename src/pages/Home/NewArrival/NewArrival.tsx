import ProductNew from "../components/ProductNew/ProductNew";
import SectionHeader from "../components/SectionHeader";
import { newArrivals } from "../../../mock/newArrivals";

const NewArrival = () => {
  const [playstation, women, speakers, perfume] = newArrivals;

  return (
    <section className="app-container pt-16 mb-[75px]">
      <SectionHeader label="Featured" title="New Arrival" />

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-9 h-[570px] mt-[50px]">
        {/* Left Side */}
        <div className="row-span-2">
          <ProductNew
            title={playstation.title}
            desc={playstation.desc}
            img={playstation.img}
            link={playstation.link}
            className="h-full"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6 row-span-2">
          <ProductNew
            title={women.title}
            desc={women.desc}
            img={women.img}
            link={women.link}
            className="flex-1"
          />

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            <ProductNew
              title={speakers.title}
              desc={speakers.desc}
              img={speakers.img}
              link={speakers.link}
              className="h-full"
            />
            <ProductNew
              title={perfume.title}
              desc={perfume.desc}
              img={perfume.img}
              link={perfume.link}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
