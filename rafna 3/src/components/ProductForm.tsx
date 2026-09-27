import { useEffect, useState, type FormEvent } from 'react'
import { ImagePlus, Loader2 } from 'lucide-react'
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
  type ProductFormData,
} from '../lib/types'

interface ProductFormProps {
  initial?: Product | null
  submitting?: boolean
  onSubmit: (data: ProductFormData) => Promise<void> | void
  onCancel?: () => void
}

export default function ProductForm({
  initial,
  submitting = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ProductCategory>('Orthopaedic Mattresses')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initial) {
      setTitle(initial.title)
      setCategory(initial.category)
      setPrice(String(initial.price))
      setDescription(initial.description)
      setPreview(initial.image_url || null)
      setImageFile(null)
    } else {
      setTitle('')
      setCategory('Orthopaedic Mattresses')
      setPrice('')
      setDescription('')
      setPreview(null)
      setImageFile(null)
    }
    setError(null)
  }, [initial])

  useEffect(() => {
    if (!imageFile) return
    const url = URL.createObjectURL(imageFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    if (!price || Number(price) < 0 || Number.isNaN(Number(price))) {
      setError('Enter a valid price in KES.')
      return
    }
    if (!initial && !imageFile) {
      setError('Please choose a product photo.')
      return
    }

    try {
      await onSubmit({
        title,
        category,
        price,
        description,
        imageFile,
        existingImageUrl: initial?.image_url,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="pf-title" className="mb-1.5 block text-sm font-semibold text-stone-700">
          Title
        </label>
        <input
          id="pf-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          placeholder="e.g. 6-inch Orthopaedic Foam Mattress"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pf-category" className="mb-1.5 block text-sm font-semibold text-stone-700">
            Category
          </label>
          <select
            id="pf-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pf-price" className="mb-1.5 block text-sm font-semibold text-stone-700">
            Price (KES)
          </label>
          <input
            id="pf-price"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            placeholder="8500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pf-desc" className="mb-1.5 block text-sm font-semibold text-stone-700">
          Description
        </label>
        <textarea
          id="pf-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-y rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          placeholder="Short product description for customers"
        />
      </div>

      <div>
        <label htmlFor="pf-image" className="mb-1.5 block text-sm font-semibold text-stone-700">
          Product photo {initial ? '(optional — leave blank to keep current)' : ''}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-600 transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-800">
            <ImagePlus className="h-4 w-4" />
            Choose image
            <input
              id="pf-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {imageFile && (
            <span className="truncate text-xs text-stone-500">{imageFile.name}</span>
          )}
        </div>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 h-32 w-32 rounded-xl object-cover ring-1 ring-stone-200"
          />
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {initial ? 'Save changes' : 'Add product'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
