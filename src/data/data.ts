import { Product, Package } from "../interfaces/bussinessModels";

export const products: Product[] = [
    {
      product_id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      image_url: 'https://via.placeholder.com/150x150/ff7b7b/333333?text=Product+1',
      available: true,
    },
    {
      product_id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 29.99,
      image_url: 'https://via.placeholder.com/150x150/6a92ff/333333?text=Product+2',
      available: true,
    },
    {
      product_id: 3,
      name: 'Product 3',
      description: 'Description of Product 3',
      price: 39.99,
      image_url: 'https://via.placeholder.com/150x150/9eff7b/333333?text=Product+3',
      available: true,
    },
    {
      product_id: 4,
      name: 'Product 4',
      description: 'Description of Product 4',
      price: 49.99,
      image_url: 'https://via.placeholder.com/150x150/ffb13b/333333?text=Product+4',
      available: false,
    },
    {
      product_id: 5,
      name: 'Product 5',
      description: 'Description of Product 5',
      price: 59.99,
      image_url: 'https://via.placeholder.com/150x150/32CD32/333333?text=Product+5',
      available: true,
    }
  ];
  
export const packages: Package[] = [
    {
      package_id: 1,
      name: 'Basic Package',
      description: 'A simple package with essential items.',
      price: 99.99,
      image_url: 'https://via.placeholder.com/150x150/0000FF/FFFFFF?text=Basic+Package',
      available: true,
      products: [
        {
          pxp_id: 1,
          product: products[0],
          quantity: 2,
        },
        {
          pxp_id: 2,
          product: products[1],
          quantity: 1,
        }
      ]
    },
    {
      package_id: 2,
      name: 'Deluxe Package',
      description: 'A premium package with extra features.',
      price: 199.99,
      image_url: 'https://via.placeholder.com/150x150/FF6347/FFFFFF?text=Deluxe+Package',
      available: true,
      products: [
        {
          pxp_id: 3,
          product: products[1],
          quantity: 2,
        },
        {
          pxp_id: 4,
          product: products[2],
          quantity: 3,
        }
      ]
    },
    {
      package_id: 3,
      name: 'Holiday Package',
      description: 'A special package for holiday season.',
      price: 299.99,
      image_url: 'https://via.placeholder.com/150x150/FFD700/FFFFFF?text=Holiday+Package',
      available: false,
      products: [
        {
          pxp_id: 5,
          product: products[3],
          quantity: 5,
        },
        {
          pxp_id: 6,
          product: products[4],
          quantity: 1,
        }
      ]
    }
  ];
  