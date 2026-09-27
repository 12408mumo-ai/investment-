import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  BUSINESS_EMAIL,
  BUSINESS_LOCATION,
  BUSINESS_NAME,
  WHATSAPP_NUMBER,
} from '../lib/whatsapp'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-teal-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src="/images/logo-mark.png"
              alt=""
              className="h-11 w-11 rounded-lg object-cover"
            />
            <div>
              <p className="font-serif text-xl font-semibold text-white">
                {BUSINESS_NAME}
              </p>
              <p className="text-xs uppercase tracking-widest text-teal-300/80">
                Quality Rest, Trusted Value
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-stone-400">
            Orthopaedic mattresses, premium beddings, and household goods for
            Kenyan homes. Serving customers from Kamkunji, Nairobi.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-200">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-white transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-200">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>{BUSINESS_LOCATION}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 shrink-0 text-amber-400" />
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-amber-400" />
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="hover:text-white transition-colors"
              >
                +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-amber-400" />
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="hover:text-white transition-colors break-all"
              >
                {BUSINESS_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-teal-900/80">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-stone-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
