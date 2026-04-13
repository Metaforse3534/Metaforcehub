import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Minus, Plus, Trash2, X } from "lucide-react";
import { products } from "@/lib/store-data";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-store";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Store — Metaforce Studio" },
      { name: "description", content: "Official Metaforce Studio merchandise and digital items." },
      { property: "og:title", content: "Store — Metaforce Studio" },
      { property: "og:description", content: "Official Metaforce Studio merchandise and digital items." },
    ],
  }),
  component: StorePage,
});

const categories = ["All", "apparel", "accessories", "digital"] as const;

function StorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-4xl font-black text-foreground">Store</h1>
            <p className="mt-2 text-muted-foreground">Official merch & digital items.</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/50"
          >
            Cart ({itemCount}) — ${total.toFixed(2)}
          </button>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* Cart sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="font-display text-lg font-bold text-foreground">Shopping Cart</h2>
                <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <p className="mt-10 text-center text-muted-foreground">Your cart is empty.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 rounded-lg border border-border/50 bg-surface p-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-primary">${item.price.toFixed(2)}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded border border-border p-1 text-muted-foreground hover:text-foreground">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm text-foreground">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded border border-border p-1 text-muted-foreground hover:text-foreground">
                              <Plus className="h-3 w-3" />
                            </button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-destructive hover:text-destructive/80">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <button className="mt-4 w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition hover:glow-neon">
                    Checkout — ${total.toFixed(2)}
                  </button>
                  <button onClick={clearCart} className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-destructive">
                    Clear Cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
