export type Product = {
  id: string;
  sku: string;
  name: string;
  swatchName: string;
  swatchHex: string;
  description: string;
  price: number;
  image: string;
};

export const INK = '#15140F';
export const PAPER = '#EDE8DC';
export const GOLD = '#F2B134';
export const BRICK = '#B3492F';
export const CREAM = '#F5F1E6';

export const products: Product[] = [
  {
    id: 'classic-black',
    sku: 'TRP-014',
    name: 'Classic Light Blue',
    swatchName: 'Jet',
    swatchHex: '#17140F',
    description: 'Snapback',
    price: 45,
    image: '/images/img2.jpeg',
  },
  {
    id: 'washed-stone',
    sku: 'TRP-021',
    name: 'Only Pans Black Purple',
    swatchName: 'Stone',
    swatchHex: '#A49B8C',
    description: 'Snapback',
    price: 48,
    image: '/images/img5.jpeg',
  },
  {
    id: 'forest',
    sku: 'TRP-032',
    name: 'Integrity Black Orange',
    swatchName: 'Pine',
    swatchHex: '#344438',
    description: 'Trucker',
    price: 45,
    image: '/images/img3.jpeg',
  },
  {
    id: 'off-white',
    sku: 'TRP-045',
    name: 'Only Pans Black Purple',
    swatchName: 'Bone',
    swatchHex: '#E7E2D8',
    description: 'Trucker',
    price: 45,
    image: '/images/img4.jpeg',
  },
];

export const collections = [
  {
    title: 'Everyday',
    description:
      'Clean silhouettes built for the nine-to-five and the walk after it.',
    image: '/images/img1.jpeg',
    kind: 'photo' as const,
  },
  {
    title: 'Washed',
    description: 'Vintage-dyed cotton that only gets better with wear.',
    kind: 'color' as const,
    color: GOLD,
  },
  {
    title: 'Structured',
    description: 'Sharper crowns, a cleaner brim, the same easy fit.',
    image: '/images/img3.jpeg',
    kind: 'photo' as const,
  },
  {
    title: 'Small batch',
    description: "Cut and sewn in short runs. Once they're gone, they're gone.",
    kind: 'color' as const,
    color: BRICK,
  },
];

export const specs = [
  { label: 'Shell', value: '12oz cotton twill' },
  { label: 'Crown', value: 'Structured, mid-profile' },
  { label: 'Closure', value: 'Brass adjustable strap' },
  { label: 'Brim', value: 'Pre-curved, stitched edge' },
  { label: 'Wash', value: 'Cold water, hang dry' },
  { label: 'Made in', value: 'Cut and sewn to order' },
];

export const tickets = [
  {
    quote: 'Wore it every day for a year before the strap even loosened.',
    name: 'Harit S.',
  },
  {
    quote: 'Fits right out of the box. No breaking-in period needed.',
    name: 'Dhriva Z.',
  },
  {
    quote: "The one I reach for when I don't want to think about it.",
    name: 'Nil S.',
  },
];

export const community = [
  '/images/img1.jpeg',
  '/images/img6.jpeg',
  '/images/img5.jpeg',
  '/images/img2.jpeg',
  '/images/img4.jpeg',
  '/images/img3.jpeg',
];

export const tilts = [-3, 2, -2, 3, -1, 2];

export const navLinks = [
  { label: 'Catalog', href: '#catalog' },
  { label: 'Collections', href: '#collections' },
  { label: 'Spec sheet', href: '#details' },
  { label: 'About', href: '#about' },
];
