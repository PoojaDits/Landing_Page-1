import { create } from 'zustand';
import type { Product, Category } from '@/types';

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'none';

interface ProductState {
    products: Product[];
    selectedCategory: Category;
    searchQuery: string;
    sortBy: SortOption;
    isLoading: boolean;
    error: string | null;
}

interface ProductActions {
    fetchProducts: () => Promise<void>;
    setCategory: (category: Category) => void;
    setSearchQuery: (query: string) => void;
    setSortBy: (sort: SortOption) => void;
    clearProducts: () => void;
}

interface ProductStore extends ProductState, ProductActions { }

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    selectedCategory: 'All',
    searchQuery: '',
    sortBy: 'none',
    isLoading: false,
    error: null,

    fetchProducts: async () => {
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

    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
    },

    setSortBy: (sort: SortOption) => {
        set({ sortBy: sort });
    },

    clearProducts: () => {
        set({ products: [] });
    },
}));
