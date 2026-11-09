'use client';

import React, { useState } from 'react';
import { FormModal, Button, ProductCard } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import { ShoppingBag } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Creator Studio Heavyweight Hoodie',
    price: 6500, // $65.00
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    category: 'Apparel',
    description: 'Custom embroidered 420 GSM heavyweight organic cotton fleece hoodie in signature mocha hue.',
  },
  {
    id: '2',
    name: 'Ergonomic Desk Mat — Sand & Umber Edition',
    price: 3200, // $32.00
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Precision tracking micro-weave surface with water-resistant coating and anti-fray stitched edges.',
  },
  {
    id: '3',
    name: 'Minimalist Aluminum Keycap Set (ANSI)',
    price: 4500, // $45.00
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    category: 'Hardware',
    description: 'CNC machined anodized aluminum keycaps for MX mechanical keyboards with laser engraved legends.',
  },
  {
    id: '4',
    name: 'Wireless Ergonomic Vertical Mouse',
    price: 5800, // $58.00
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    category: 'Hardware',
    description: 'Natural handshake angle designed to reduce wrist fatigue during long recording and editing marathons.',
  },
  {
    id: '5',
    name: 'Thermal Travel Coffee Mug 16oz',
    price: 2800, // $28.00
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Double-wall vacuum insulated stainless steel tumbler keeps brew hot for 12 hours.',
  },
  {
    id: '6',
    name: 'Everyday Tech Cable Organizer Pouch',
    price: 2400, // $24.00
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Weatherproof ripstop nylon pouch for SD cards, chargers, cables, and mobile microphones.',
  },
  {
    id: '7',
    name: 'Creator Studio Signature Cotton Cap',
    price: 2600, // $26.00
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    category: 'Apparel',
    description: 'Low-profile 6-panel unstructured dad hat with brass clasp and subtle embroidered emblem.',
  },
  {
    id: '8',
    name: 'Dual Studio Monitor Arm Stand',
    price: 8900, // $89.00
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    category: 'Hardware',
    description: 'Heavy duty gas-spring mechanical desk clamp arms supporting up to 32-inch displays.',
  },
];

export default function PublicStorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const categories = ['All', 'Apparel', 'Accessories', 'Hardware'];

  const filtered = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNavbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border/60">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Official Merch
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mt-1">
                Creator Store & Gear
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Official apparel, productivity desk accessories, and custom studio equipment designed for tech creators and enthusiasts.
              </p>
            </div>

            {/* Cart Status & Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 overflow-x-auto rounded-md border border-border bg-surface-muted/60 p-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground shrink-0">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span>Cart ({cartCount})</span>
              </div>
            </div>
          </div>

          {/* Product Grid: 4 cards in PC, 2 cards in mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-8">
            {filtered.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                category={item.category}
                onAddToCart={() => {
                  setCartCount((c) => c + 1);
                  setSelectedProduct(item);
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Product Added Confirmation Modal */}
      <FormModal
        isOpen={Boolean(selectedProduct)}
        title="Added to Cart"
        description="Item successfully placed in your shopping cart."
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-20 w-20 rounded-xl object-cover border border-border"
              />
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm">
                  {selectedProduct.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedProduct.description}
                </p>
                <p className="text-sm font-bold text-primary mt-2">
                  ${(selectedProduct.price / 100).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedProduct(null)}>
                Continue Shopping
              </Button>
              <Button size="sm" onClick={() => setSelectedProduct(null)}>
                Checkout Now
              </Button>
            </div>
          </div>
        )}
      </FormModal>

      <PublicFooter />
    </div>
  );
}
