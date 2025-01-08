import { Package } from "./bussinessModels";

export interface CarouselItemProps {
    pack: Package
}

export interface CarouselProps {
    items: Package[]
}

export interface UnitCardProps {
    name:string,
    description:string,
    price:number,
    image_url:string,
}