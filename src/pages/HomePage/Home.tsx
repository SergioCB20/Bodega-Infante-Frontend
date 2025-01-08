import Carousel from "../../components/Carousel";
import UnitCard from "../../components/UnitCard";
import { packages,products } from "../../data/data";


const Home = () => {
  return (
    <div className="w-full h-full p-20 px-8 flex flex-col gap-8">
      <Carousel items={packages}/>
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold">Nuestros Productos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {products.map((product) => (
            <UnitCard key={product.product_id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
