export const siteUrl = 'https://trshpnda.ca';
export const openGraphImageUrl = '/open-image.png';

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
  '/products/img1.jpeg',
  '/products/img6.jpeg',
  '/products/img5.jpeg',
  '/products/img2.jpeg',
  '/products/img4.jpeg',
  '/products/img3.jpeg',
];

export const tilts = [-3, 2, -2, 3, -1, 2];

export const navLinks = [
  { label: 'Collection', href: '/products' },
  { label: 'About', href: '#about' },
];

export const footerLinks = [
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Size Guide', href: '/size-guide' },
];
