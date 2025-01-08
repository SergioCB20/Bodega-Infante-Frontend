export interface Package{
    package_id:number,
    name:string,
    description:string,
    price:number,
    image_url:string,
    available:boolean
    products: ProductPackage[]
}

export interface Product{
    product_id:number,
    name:string,
    description:string,
    price:number,
    image_url:string,
    available:boolean
}

export interface ProductPackage{
    pxp_id:number,
    product:Product,
    quantity:number
}