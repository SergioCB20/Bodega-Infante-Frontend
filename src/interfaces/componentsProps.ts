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

export interface DropdownProps {
    isOpen: boolean;
    items: DropdownItemProps[];
}

export enum DropdownItemType {
    LINK = 'link',
    BUTTON = 'button',
}

export interface DropdownItemProps {
    href?: string;
    text: string;
    onClick?: () => void;
    type: DropdownItemType;
}