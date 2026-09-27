import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from 'lucide-react'

const categories = [
  {
    title: 'Orthopaedic Mattresses',
    description:
      'Foam, fiber, spring, and orthopaedic mattresses engineered for better rest and spinal support.',
    image: '/images/category-mattresses.png',
    filter: 'Orthopaedic Mattresses',
  },
  {
    title: 'Beddings',
    description:
      'Bedsheets, duvets, bedding sets, and blankets in quality finishes for every bedroom.',
    image: '/images/category-beddings.png',
    filter: 'Beddings',
  },
  {
    title: 'Households',
    description:
      'Practical household goods to complete a comfortable, well-kept home.',
    image: '/images/category-households.png',
    filter: 'Households',
  },
]

const policies = [
  {
    icon: Truck,
    title: 'Free delivery in Nairobi',
    text: 'Free delivery within Nairobi & surrounding areas on your orders.',
  },
  {
    icon: Package,
    title: 'Countrywide delivery',
    text: 'Affordable countrywide delivery for customers outside Nairobi.',
  },
  {
    icon: Banknote,
    title: 'Pay on Delivery',
    text: 'Pay on Delivery available within Nairobi & surroundings.',
  },
  {
    icon: MapPin,
    title: 'Shop Pick Up',
    text: 'Collect your order at our shop in Kamkunji, Nairobi.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bedroom.png"
            alt="Premium bedroom with orthopaedic mattress"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/75 to-teal-900/40" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted Kenyan retail
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Rest well with Rafna Investment
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
              Orthopaedic mattresses, premium beddings, and household goods from
              Kamkunji, Nairobi. Quality you can trust — order instantly on
              WhatsApp, no online cart required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-bold text-teal-950 shadow-lg transition hover:bg-amber-300"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/254710565055"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-teal-950 sm:text-4xl">
                About Rafna Investment
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Based in Kamkunji, Nairobi, Rafna Investment supplies orthopaedic
                mattresses (foam, fiber, spring, and orthopaedic), beddings
                (bedsheets, duvets, bedding sets, blankets), and everyday
                household goods. We focus on fair prices, clear policies, and a
                simple WhatsApp order flow so you can shop with confidence.
              </p>
              <p className="mt-3 text-sm text-stone-500">
                Email:{' '}
                <a
                  href="mailto:rafnainvestment@gmail.com"
                  className="font-medium text-teal-800 hover:underline"
                >
                  rafnainvestment@gmail.com
                </a>
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-[#FBF8F3] p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                How ordering works
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-stone-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
                    1
                  </span>
                  Browse products in the Shop and tap <strong>Order Now</strong>.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
                    2
                  </span>
                  Choose Delivery or Shop Pick Up and enter your details.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
                    3
                  </span>
                  Send the pre-filled order on WhatsApp — we confirm and fulfil.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold text-teal-950 sm:text-4xl">
            Shop by category
          </h2>
          <p className="mt-3 text-stone-600">
            Explore our core ranges — every product is ordered directly via
            WhatsApp for a fast, personal experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.filter)}`}
                className="group block overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-teal-950">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {cat.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
                    View products
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Policies */}
      <section className="bg-teal-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              Delivery, payment & pickup
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-teal-100/80">
              Clear policies so you always know what to expect when you order
              from Rafna Investment.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {policies.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-teal-100/75">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-teal-950 transition hover:bg-amber-300"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
