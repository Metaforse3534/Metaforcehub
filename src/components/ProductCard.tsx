import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/store-data";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/50"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {product.category}
        </span>
        <h3 className="mt-1 font-display text-base font-bold text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
