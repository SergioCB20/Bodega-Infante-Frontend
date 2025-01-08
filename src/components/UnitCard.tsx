import { UnitCardProps } from "../interfaces/componentsProps";

const UnitCard: React.FC<UnitCardProps> = ({ name, description, price, image_url }) => {
  return (
    <div className="max-w-xs min-w-40 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="px-4 py-2">
        <h1 className="text-lg lg:text-xl font-bold text-gray-800 uppercase dark:text-white">{name}</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <img className="object-cover w-full h-48 mt-2" src={image_url} alt={name} />

      <div className="flex w-full items-center justify-around lg:px-4 py-2 bg-gray-900">
        <h1 className="text-sm lg:text-lg font-bold text-white">S/.{price}</h1>
        <button className="w-[60px] lg:w-auto px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default UnitCard;

