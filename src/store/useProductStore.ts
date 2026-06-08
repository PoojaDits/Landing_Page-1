import { create } from 'zustand';
import type { Product, Category } from '@/types';

interface ProductState {
    products: Product[];
    selectedCategory: Category;
    isLoading: boolean;
    error: string | null;
}

interface ProductActions {
    fetchProducts: () => Promise<void>;
    setCategory: (category: Category) => void;
    clearProducts: () => void;
}

interface ProductStore extends ProductState, ProductActions { }

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    selectedCategory: 'All',
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        // Prevent redundant fetches if we already have products
        if (get().products.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            set({ products: data, isLoading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : 'An unknown error occurred',
                isLoading: false
            });
        }
    },

    setCategory: (category: Category) => {
        set({ selectedCategory: category });
    },

    clearProducts: () => {
        set({ products: [] });
    },
}));
