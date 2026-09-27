import { motion } from 'framer-motion'
import type { Product } from '../lib/types'
import { formatKes } from '../lib/whatsapp'

interface ProductCardProps {
  product: Product
  onOrder: (product: Product) => void
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-400">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-800 shadow-sm backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-teal-950">
          {product.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">
          {product.description || 'Quality product from Rafna Investment.'}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-xl font-bold tracking-tight text-teal-800">
            {formatKes(Number(product.price))}
          </p>
          <button
            type="button"
            onClick={() => onOrder(product)}
            className="rounded-full bg-teal-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Order Now
          </button>
        </div>
      </div>
    </motion.article>
  )
}
