export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "apparel" | "accessories" | "digital";
  image: string;
}

export const products: Product[] = [
  {
    id: "neon-strike-tee",
    name: "Neon Strike T-Shirt",
    price: 29.99,
    description: "Premium cotton tee featuring the Neon Strike logo with reflective neon print.",
    category: "apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: "metaforce-hoodie",
    name: "Metaforce Hoodie",
    price: 59.99,
    description: "Ultra-soft hoodie with embroidered Metaforce Studio logo and neon accents.",
    category: "apparel",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  },
  {
    id: "velocity-cap",
    name: "Velocity X Cap",
    price: 24.99,
    description: "Snapback cap with Velocity X branding. One size fits all.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=400&fit=crop",
  },
  {
    id: "stellar-void-poster",
    name: "Stellar Void Art Print",
    price: 19.99,
    description: "High-quality 24x36 art print of the Stellar Void key artwork.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop",
  },
  {
    id: "digital-soundtrack",
    name: "Complete Soundtrack Bundle",
    price: 14.99,
    description: "Digital soundtrack collection from all Metaforce Studio games. MP3 & FLAC.",
    category: "digital",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
  },
  {
    id: "founder-pack",
    name: "Founder's Digital Pack",
    price: 49.99,
    description: "Exclusive digital items: wallpapers, avatars, in-game skins, and early access passes.",
    category: "digital",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
  },
];
