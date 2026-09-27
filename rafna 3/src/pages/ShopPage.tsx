import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loader2, PackageOpen } from 'lucide-react'
import CategoryFilter, { type FilterValue } from '../components/CategoryFilter'
import OrderModal from '../components/OrderModal'
import ProductCard from '../components/ProductCard'
import { isSupabaseConfigured } from '../lib/supabase'
import { fetchProducts } from '../lib/products'
import { PRODUCT_CATEGORIES, type Product, type ProductCategory } from '../lib/types'

function parseCategory(raw: string | null): FilterValue {
  if (!raw) return 'All'
  if (PRODUCT_CATEGORIES.includes(raw as ProductCategory)) {
    return raw as ProductCategory
  }
  return 'All'
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState<FilterValue>(() =>
    parseCategory(searchParams.get('category')),
  )
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Product | null>(null)

  const load = useCallback(async (cat: FilterValue) => {
    setLoading(true)
    setError(null)
    try {
      if (!isSupabaseConfigured) {
        setProducts([])
        setError(
          'Catalogue is not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then run the SQL setup script.',
        )
        return
      }
      const data = await fetchProducts(cat)
      setProducts(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not load products. Please try again.',
      )
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const fromUrl = parseCategory(searchParams.get('category'))
    setCategory(fromUrl)
    void load(fromUrl)
  }, [searchParams, load])

  const handleFilter = (value: FilterValue) => {
    setCategory(value)
    if (value === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: value })
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
          Catalogue
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-teal-950 sm:text-4xl">
          Shop
        </h1>
        <p className="mt-3 text-stone-600">
          Browse live products from Rafna Investment. Tap{' '}
          <strong>Order Now</strong> to send your order on WhatsApp — no cart,
          no online payment.
        </p>
      </div>

      <div className="mb-8">
        <CategoryFilter value={category} onChange={handleFilter} />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-stone-500">
          <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
          <p className="text-sm">Loading products…</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 text-amber-950">
          <p className="font-semibold">Unable to load catalogue</p>
          <p className="mt-1 text-sm text-amber-900/80">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
          <PackageOpen className="h-12 w-12 text-stone-300" />
          <h2 className="mt-4 font-serif text-xl font-semibold text-teal-950">
            No products yet
          </h2>
          <p className="mt-2 max-w-md text-sm text-stone-500">
            {category === 'All'
              ? 'Products added in the Admin dashboard will appear here automatically.'
              : `No products in “${category}” right now. Try another category.`}
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={setSelected}
            />
          ))}
        </div>
      )}

      <OrderModal product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
