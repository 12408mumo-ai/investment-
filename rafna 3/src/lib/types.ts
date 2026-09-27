export type ProductCategory =
  | 'Orthopaedic Mattresses'
  | 'Beddings'
  | 'Households'

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Orthopaedic Mattresses',
  'Beddings',
  'Households',
]

export interface Product {
  id: string
  title: string
  category: ProductCategory
  price: number
  description: string
  image_url: string
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  title: string
  category: ProductCategory
  price: string
  description: string
  imageFile: File | null
  existingImageUrl?: string
}

export type FulfillmentType = 'Delivery' | 'Shop Pick Up'

export interface OrderFormData {
  fulfillment: FulfillmentType
  location: string
  fullName: string
  phone: string
}

export type ProductInsert = {
  title: string
  category: ProductCategory
  price: number
  description: string
  image_url: string
}

export type ProductUpdate = {
  title: string
  category: ProductCategory
  price: number
  description: string
  image_url: string
}
