import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import UnitCard from "../../components/UnitCard";
import { Package, Product } from "../../interfaces/bussinessModels";
import { packages,products } from "../../data/data";

const Home = () => {

  /*const [packages,setPackages] = useState<Package[]>([]);
  const [products,setProducts] = useState<Product[]>([]);

  useEffect(()=>{

  },[])*/

  return (
    <div className="w-full p-20 px-8 flex flex-col gap-8">
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
