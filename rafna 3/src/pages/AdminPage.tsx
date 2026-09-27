import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import ProductForm from '../components/ProductForm'
import { useAuth } from '../context/AuthContext'
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../lib/products'
import type { Product, ProductFormData } from '../lib/types'
import { formatKes } from '../lib/whatsapp'

export default function AdminPage() {
  const { user, loading: authLoading, configured, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [authBusy, setAuthBusy] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [listLoading, setListLoading] = useState(false)
  const [listError, setListError] = useState<string | null>(null)

  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [formBusy, setFormBusy] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    setListLoading(true)
    setListError(null)
    try {
      const data = await fetchProducts('All')
      setProducts(data)
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setListLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) void loadProducts()
  }, [user, loadProducts])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setAuthBusy(true)
    const { error } = await signIn(email.trim(), password)
    setAuthBusy(false)
    if (error) setAuthError(error)
  }

  const handleCreate = async (data: ProductFormData) => {
    setFormBusy(true)
    try {
      await createProduct(data)
      setShowAdd(false)
      await loadProducts()
    } finally {
      setFormBusy(false)
    }
  }

  const handleUpdate = async (data: ProductFormData) => {
    if (!editing) return
    setFormBusy(true)
    try {
      await updateProduct(editing.id, data, editing.image_url)
      setEditing(null)
      await loadProducts()
    } finally {
      setFormBusy(false)
    }
  }

  const handleDelete = async (product: Product) => {
    const ok = window.confirm(
      `Delete “${product.title}”? This cannot be undone.`,
    )
    if (!ok) return
    setDeletingId(product.id)
    try {
      await deleteProduct(product)
      await loadProducts()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <Link to="/" className="mb-6 flex items-center gap-2.5">
            <img
              src="/images/logo-mark.png"
              alt="Rafna Investment"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-serif text-lg font-semibold text-teal-950">
              Rafna Investment
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-teal-950">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Sign in with your Supabase email and password to manage the
            catalogue. No credentials are stored in this app.
          </p>

          {!configured && (
            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Supabase env vars are missing. Set{' '}
              <code className="text-xs">VITE_SUPABASE_URL</code> and{' '}
              <code className="text-xs">VITE_SUPABASE_ANON_KEY</code>.
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-sm font-semibold text-stone-700"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-sm font-semibold text-stone-700"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>
            {authError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {authError}
              </p>
            )}
            <button
              type="submit"
              disabled={authBusy || !configured}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-800 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
            >
              {authBusy && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F1EB]">
      {/* Admin top bar */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5" title="Back to site">
            <img
              src="/images/logo-mark.png"
              alt="Rafna Investment"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <div className="leading-tight">
              <span className="block font-serif text-base font-semibold text-teal-950">
                Rafna Investment
              </span>
              <span className="text-[11px] uppercase tracking-wider text-stone-400">
                Admin dashboard
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-stone-500 sm:inline truncate max-w-[180px]">
              {user.email}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3.5 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-teal-950 sm:text-3xl">
              Products
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Add, edit, or remove catalogue items. Changes appear live on the
              Shop page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditing(null)
              setShowAdd(true)
            }}
            className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </button>
        </div>

        {/* Add form panel */}
        {showAdd && (
          <div className="mb-8 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-teal-950">
                Add New Product
              </h2>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="rounded-full p-2 text-stone-500 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductForm
              submitting={formBusy}
              onSubmit={handleCreate}
              onCancel={() => setShowAdd(false)}
            />
          </div>
        )}

        {/* Edit form panel */}
        {editing && (
          <div className="mb-8 rounded-3xl border border-teal-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-teal-950">
                Edit Product
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full p-2 text-stone-500 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductForm
              initial={editing}
              submitting={formBusy}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}

        {/* Product list */}
        <div className="rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-100 px-5 py-4">
            <h2 className="font-semibold text-teal-950">Existing Products</h2>
          </div>

          {listLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-teal-700" />
            </div>
          )}

          {!listLoading && listError && (
            <p className="px-5 py-8 text-sm text-red-600">{listError}</p>
          )}

          {!listLoading && !listError && products.length === 0 && (
            <p className="px-5 py-12 text-center text-sm text-stone-500">
              No products yet. Click “Add New Product” to create your first item.
            </p>
          )}

          {!listLoading && !listError && products.length > 0 && (
            <ul className="divide-y divide-stone-100">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
                >
                  <img
                    src={product.image_url}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-stone-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-teal-950">{product.title}</p>
                    <p className="mt-0.5 text-xs text-stone-500">
                      {product.category} · {formatKes(Number(product.price))}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdd(false)
                        setEditing(product)
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === product.id}
                      onClick={() => void handleDelete(product)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === product.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
