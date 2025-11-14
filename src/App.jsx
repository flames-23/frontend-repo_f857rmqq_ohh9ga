import { useState } from 'react'
import Hero from './components/Hero'
import BookingForm from './components/BookingForm'
import Pricing from './components/Pricing'
import LiveTrack from './components/LiveTrack'

function App() {
  const [lastBookingId, setLastBookingId] = useState('')
  const [pendingQuote, setPendingQuote] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Hero />

      <main className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BookingForm onCreated={(id, payload) => { setLastBookingId(id); setPendingQuote(payload) }} />
            <Pricing />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <LiveTrack technicianId={pendingQuote?.technician_id || ''} />
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold">Why choose us</h3>
              <ul className="mt-3 space-y-2 text-gray-700 text-sm">
                <li>• Vetted technicians across the city</li>
                <li>• Real‑time arrival tracking</li>
                <li>• Clear, upfront pricing</li>
                <li>• Reviews you can trust</li>
                <li>• Secure in‑app payments</li>
              </ul>
              {lastBookingId && (
                <p className="mt-4 text-sm text-green-700">Booking created: {lastBookingId}</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} SwiftFix — Quality • Speed • Transparency
      </footer>
    </div>
  )
}

export default App
