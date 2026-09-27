import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, MessageCircle, Truck, X } from 'lucide-react'
import type { FulfillmentType, OrderFormData, Product } from '../lib/types'
import { buildWhatsAppOrderUrl, formatKes } from '../lib/whatsapp'

interface OrderModalProps {
  product: Product | null
  onClose: () => void
}

const initialForm: OrderFormData = {
  fulfillment: 'Delivery',
  location: '',
  fullName: '',
  phone: '',
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
  const [form, setForm] = useState<OrderFormData>(initialForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (product) {
      setForm(initialForm)
      setError(null)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  const setFulfillment = (fulfillment: FulfillmentType) => {
    setForm((prev) => ({
      ...prev,
      fulfillment,
      location: fulfillment === 'Shop Pick Up' ? 'Kamkunji Pick Up' : '',
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const fullName = form.fullName.trim()
    const phone = form.phone.trim()
    const location =
      form.fulfillment === 'Shop Pick Up'
        ? 'Kamkunji Pick Up'
        : form.location.trim()

    if (!fullName) {
      setError('Please enter your full name.')
      return
    }
    if (!phone) {
      setError('Please enter your phone number.')
      return
    }
    if (form.fulfillment === 'Delivery' && !location) {
      setError('Please enter your delivery location.')
      return
    }

    const url = buildWhatsAppOrderUrl({
      product,
      fulfillment: form.fulfillment,
      location,
      fullName,
      phone,
    })
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-teal-950/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Place your order
                </p>
                <h2
                  id="order-modal-title"
                  className="mt-0.5 font-serif text-xl font-semibold text-teal-950"
                >
                  Order via WhatsApp
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4">
              <div className="flex gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-3">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-teal-950">
                    {product.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-stone-500">{product.category}</p>
                  <p className="mt-1 text-lg font-bold text-teal-800">
                    {formatKes(Number(product.price))}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-stone-700">
                    Fulfillment
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillment('Delivery')}
                      className={[
                        'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition',
                        form.fulfillment === 'Delivery'
                          ? 'border-teal-700 bg-teal-50 text-teal-900 ring-1 ring-teal-700'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300',
                      ].join(' ')}
                    >
                      <Truck className="h-4 w-4" />
                      Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment('Shop Pick Up')}
                      className={[
                        'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition',
                        form.fulfillment === 'Shop Pick Up'
                          ? 'border-teal-700 bg-teal-50 text-teal-900 ring-1 ring-teal-700'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300',
                      ].join(' ')}
                    >
                      <MapPin className="h-4 w-4" />
                      Shop Pick Up
                    </button>
                  </div>
                </fieldset>

                {form.fulfillment === 'Delivery' ? (
                  <div>
                    <label
                      htmlFor="order-location"
                      className="mb-1.5 block text-sm font-semibold text-stone-700"
                    >
                      Delivery location
                    </label>
                    <input
                      id="order-location"
                      type="text"
                      value={form.location}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, location: e.target.value }))
                      }
                      placeholder="e.g. Westlands, Nairobi"
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                      Free delivery within Nairobi & surrounding areas.
                      Affordable countrywide delivery outside Nairobi.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-teal-100 bg-teal-50 px-3.5 py-3 text-sm text-teal-900">
                    <span className="font-semibold">Pick-up location:</span>{' '}
                    Kamkunji Pick Up, Nairobi
                  </div>
                )}

                <div>
                  <label
                    htmlFor="order-name"
                    className="mb-1.5 block text-sm font-semibold text-stone-700"
                  >
                    Full name
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fullName: e.target.value }))
                    }
                    placeholder="Your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-phone"
                    className="mb-1.5 block text-sm font-semibold text-stone-700"
                  >
                    Phone number
                  </label>
                  <input
                    id="order-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="e.g. 0712 345 678"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe57] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Order via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
