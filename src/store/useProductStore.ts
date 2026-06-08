// src/store/useProductStore.ts
import { create } from 'zustand'
import type { Category } from '@/types'

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'none'

interface ProductState {
  selectedCategory: Category
  searchQuery: string
  sortBy: SortOption
}

interface ProductActions {
  setCategory: (category: Category) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sort: SortOption) => void
}

export const useProductStore = create<ProductState & ProductActions>((set) => ({
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'none',
  setCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
}))