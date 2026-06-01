export interface Store {
  id: string
  name: string
  ownerName: string
  ownerEmail: string
  location: string
  productsCount: number
  currentOrders: number
  pendingOrders: number
  complaints: number
  region: string
  phone: string
  status: 'Active' | 'Paused' | 'Pending'
}
