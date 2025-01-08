import { CarouselItemProps } from "../interfaces/componentsProps"

const CarouselItem: React.FC<CarouselItemProps> = ({pack}) => {
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 flex-shrink-0">
    <img className="object-cover w-full h-64" src={pack.image_url} alt={pack.name} />
    <div className="p-6">
        <div>
            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex={0} role="link">{pack.name}</a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{pack.description}</p>
        </div>

        <div className="mt-4">
            <div className="flex items-center">
                <span className="mx-1 text-xs text-black dark:text-gray-300">Precio: </span>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{pack.price}</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default CarouselItem
