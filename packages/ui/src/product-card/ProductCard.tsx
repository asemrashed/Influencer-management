import React from 'react';
import { Card, CardContent } from '../primitives/card.js';
import { Money } from '../money/Money.js';
import { Button } from '../primitives/button.js';
import { cn } from '../lib/utils.js';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number; // minor units
  currency?: string;
  image?: string | null;
  category?: string;
  onAddToCart?: (id: string) => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  currency = 'USD',
  image,
  category,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <Card className={cn('overflow-hidden flex flex-col group transition-all hover:shadow-md', className)}>
      <div className="relative aspect-square w-full bg-muted overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {category && (
          <span className="absolute top-2 left-2 rounded-full bg-surface/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm border border-border/50">
            {category}
          </span>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h4 className="font-semibold text-foreground text-sm line-clamp-1">{name}</h4>
          <div className="mt-1">
            <Money amount={price} currency={currency} className="text-sm text-foreground font-bold" />
          </div>
        </div>
        {onAddToCart && (
          <div className="mt-4">
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              onClick={() => onAddToCart(id)}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
