import { CarCard, CartCarCard, CustomFilter, SearchBar, ShowMore } from "@/app/components";
import { fuels, yearsOfProduction } from "@/app/constants";
import { HomeProps } from "@/app/types";
import { fetchCars } from "@/app/utils";
import CarList from "../components/card/CarList";


async function Cars({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "ford",
    year: searchParams.year || 2021,
    fuel: searchParams.fuel || "gas",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  const isCarsEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div className="mt-22 padding-x padding-y max-width padding-t" id="discover">
      <div className="home_text-container">
        <p className=" mt-12">Explore more than</p>
      </div>
      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>
      {!isCarsEmpty ? (
        <section>
          <div>
            {allCars?.map((car) => (
              <CarList key={car.combination_mpg}/>
            ))}
          </div>
          <ShowMore
            pageNumber={(searchParams.limit || 10) / 10}
            isNext={(searchParams.limit || 10) > allCars?.length}
          />
        </section>
      ) : (
        <h2 className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>{allCars?.message}</p>
        </h2>
      )}
    </div>
  );
}

export default Cars;
