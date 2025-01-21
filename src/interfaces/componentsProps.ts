import { ZodAny } from "zod";
import { Package } from "./bussinessModels";
import { AdminTableData } from "./dtos";

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

export interface PanelProps {
    title: string;
    options: OptionPanelProps[];
}

export interface OptionPanelProps {
    title: string;
    description: string;
    onClick: () => void;
}

export interface AdminTablesProps {
    title:string,
    subtitle?:string,
    fields:Field[],
    actions:Action[]
    getData:()=> Promise<any>
    setOpenCreationFormModal?:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Action {
    name:string,
    onClick: (data:AdminTableData)=>void
}

export interface Field {
    name: string,
    displayedName:string
}
