import { isSupabaseConfigured, supabase } from './supabase'
import type { Product, ProductCategory, ProductFormData } from './types'
import { extractStoragePath } from './whatsapp'

export async function fetchProducts(
  category?: ProductCategory | 'All',
): Promise<Product[]> {
  if (!isSupabaseConfigured) return []

  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as Product[]
}

async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileName = `${crypto.randomUUID()}.${ext}`
  const path = `products/${fileName}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    })

  if (error) throw error

  const { data } = supabase.storage.from('product-images').getPublicUrl(path)
  return data.publicUrl
}

export async function createProduct(form: ProductFormData): Promise<Product> {
  if (!form.imageFile) throw new Error('Product image is required')

  const imageUrl = await uploadProductImage(form.imageFile)
  const price = Number(form.price)
  if (Number.isNaN(price) || price < 0) throw new Error('Invalid price')

  const { data, error } = await supabase
    .from('products')
    .insert({
      title: form.title.trim(),
      category: form.category,
      price,
      description: form.description.trim(),
      image_url: imageUrl,
    })
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function updateProduct(
  id: string,
  form: ProductFormData,
  previousImageUrl?: string,
): Promise<Product> {
  const price = Number(form.price)
  if (Number.isNaN(price) || price < 0) throw new Error('Invalid price')

  let imageUrl = form.existingImageUrl || previousImageUrl || ''

  if (form.imageFile) {
    imageUrl = await uploadProductImage(form.imageFile)
    // Best-effort cleanup of the previous image
    if (previousImageUrl) {
      const oldPath = extractStoragePath(previousImageUrl)
      if (oldPath) {
        await supabase.storage.from('product-images').remove([oldPath])
      }
    }
  }

  const { data, error } = await supabase
    .from('products')
    .update({
      title: form.title.trim(),
      category: form.category,
      price,
      description: form.description.trim(),
      image_url: imageUrl,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function deleteProduct(product: Product): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', product.id)
  if (error) throw error

  const path = extractStoragePath(product.image_url)
  if (path) {
    await supabase.storage.from('product-images').remove([path])
  }
}
