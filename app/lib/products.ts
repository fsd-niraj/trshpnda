export type ProductVariant = {
  id: string;
  name: string; // e.g. Black / Orange
  sku: string;
  price: number;
  currency: 'CAD' | 'USD';
  image: string;
  images: string[];
  available: boolean;
};

export type ProductDesign = {
  id: string;
  slug: string; // URL for the entire design
  name: string; // e.g. Integrity
  style: string; // e.g. Trucker
  description: string;
  featured: boolean;
  variants: ProductVariant[];
};

export const products: ProductDesign[] = [
  {
    id: 'design-001',
    slug: 'integrity-trucker',
    name: 'Integrity',
    style: 'Trucker',
    description: 'A structured trucker cap with a distinctive finish.',
    featured: true,
    variants: [
      {
        id: 'integrity-black-orange',
        name: 'Black / Orange',
        sku: 'TRS-001',
        price: 45,
        currency: 'CAD',
        image: '/products/img1.jpeg',
        images: [
          '/products/img2.jpeg',
          '/products/img3.jpeg',
          '/products/img4.jpeg',
        ],
        available: false,
      },
      {
        id: 'integrity-black-white',
        name: 'Black / White',
        sku: 'TRS-002',
        price: 45,
        currency: 'CAD',
        image: '/products/img2.jpeg',
        images: ['/products/img1.jpeg', '/products/img3.jpeg'],
        available: false,
      },
    ],
  },
];
