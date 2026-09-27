import type { FulfillmentType, Product } from './types'

export const WHATSAPP_NUMBER = '254710565055'
export const BUSINESS_EMAIL = 'rafnainvestment@gmail.com'
export const BUSINESS_NAME = 'Rafna Investment'
export const BUSINESS_LOCATION = 'Kamkunji, Nairobi, Kenya'

export function formatKes(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function buildWhatsAppOrderUrl(params: {
  product: Product
  fulfillment: FulfillmentType
  location: string
  fullName: string
  phone: string
}): string {
  const { product, fulfillment, location, fullName, phone } = params
  const message = [
    `Hello ${BUSINESS_NAME},`,
    '',
    'I would like to order:',
    `- Product: ${product.title}`,
    `- Price: ${formatKes(product.price)}`,
    `- Fulfillment: ${fulfillment}`,
    `- Location: ${location}`,
    `- Name: ${fullName}`,
    `- Phone: ${phone}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function extractStoragePath(imageUrl: string): string | null {
  if (!imageUrl) return null
  const marker = '/product-images/'
  const idx = imageUrl.indexOf(marker)
  if (idx === -1) return null
  try {
    return decodeURIComponent(imageUrl.slice(idx + marker.length).split('?')[0])
  } catch {
    return imageUrl.slice(idx + marker.length).split('?')[0]
  }
}
