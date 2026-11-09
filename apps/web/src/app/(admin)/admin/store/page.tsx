'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge, Money } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Plus, Package } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number; // minor units
  inventory: number;
  status: 'ACTIVE' | 'DRAFT' | 'OUT_OF_STOCK';
}

export default function StoreAdminPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: '1',
      name: 'Creator Studio Heavyweight Hoodie',
      category: 'Apparel',
      price: 6500, // $65.00
      inventory: 142,
      status: 'ACTIVE',
    },
    {
      id: '2',
      name: 'Minimalist Desk Mat (Dark Walnut Edition)',
      category: 'Accessories',
      price: 3200, // $32.00
      inventory: 48,
      status: 'ACTIVE',
    },
    {
      id: '3',
      name: 'Mechanical Keycap Set (Custom Font)',
      category: 'Tech Gear',
      price: 4500, // $45.00
      inventory: 0,
      status: 'OUT_OF_STOCK',
    },
  ]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [price, setPrice] = useState('45');
  const [inventory, setInventory] = useState('50');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newProd: ProductItem = {
      id: String(Date.now()),
      name,
      category,
      price: Math.round(parseFloat(price) * 100),
      inventory: parseInt(inventory, 10) || 0,
      status: 'ACTIVE',
    };

    setProducts([newProd, ...products]);
    setName('');
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Product Name',
      render: (row: ProductItem) => (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (row: ProductItem) => (
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          {row.category}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (row: ProductItem) => (
        <Money amount={row.price} currency="USD" className="text-sm font-semibold text-foreground" />
      ),
    },
    {
      key: 'inventory',
      header: 'Stock Level',
      render: (row: ProductItem) => (
        <span className={`text-xs font-medium ${row.inventory === 0 ? 'text-danger' : 'text-foreground'}`}>
          {row.inventory} units in stock
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: ProductItem) => {
        let variant: 'success' | 'warning' | 'danger' = 'success';
        if (row.status === 'OUT_OF_STOCK') variant = 'danger';
        if (row.status === 'DRAFT') variant = 'warning';
        return <Badge variant={variant}>{row.status.replace(/_/g, ' ')}</Badge>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Store & Merchandise Management"
        description="Configure merchandise products, adjust stock levels, and review orders."
        actions={
          can('store.write') && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Add Product</span>
            </Button>
          )
        }
      />

      <DataTable
        columns={columns}
        data={products}
        keyField="id"
      />

      <FormModal
        isOpen={isModalOpen}
        title="Add New Merchandise Item"
        description="Create a product listing with price and initial stock."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Product Title</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Creator Coffee Tumbler"
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Category</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Apparel, Gear..."
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Price (USD)</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="35"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Initial Inventory Quantity</label>
            <Input
              type="number"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              placeholder="100"
              className="mt-1"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save Product
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

