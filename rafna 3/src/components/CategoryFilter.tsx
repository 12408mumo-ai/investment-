import { PRODUCT_CATEGORIES, type ProductCategory } from '../lib/types'

export type FilterValue = 'All' | ProductCategory

interface CategoryFilterProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
}

const options: FilterValue[] = ['All', ...PRODUCT_CATEGORIES]

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              'rounded-full px-4 py-2 text-sm font-medium transition',
              active
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-teal-600 hover:text-teal-800',
            ].join(' ')}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
