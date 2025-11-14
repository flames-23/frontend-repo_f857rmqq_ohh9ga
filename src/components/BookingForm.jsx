import { useState } from 'react'

const categories = [
  { id: 'home', label: 'Home Repairs' },
  { id: 'vehicle', label: 'Vehicle Repairs' },
]

function BookingForm({ onCreated }) {
  const [form, setForm] = useState({
    category: 'home',
    service_type: '',
    address: '',
    vehicle_info: '',
    customer_name: '',
    contact_phone: '',
    contact_email: '',
    scheduled_time: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...form,
        price_quote: 0,
        scheduled_time: new Date(form.scheduled_time).toISOString(),
      }
      const res = await fetch(`${backend}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create booking')
      const data = await res.json()
      onCreated?.(data.id, payload)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} id="book" className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h3 className="text-xl font-semibold">Schedule a booking</h3>
      <p className="text-sm text-gray-600 mb-4">We’ll match you with a nearby technician.</p>

      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="flex gap-3">
            {categories.map(c => (
              <button type="button" key={c.id} onClick={() => update('category', c.id)}
                className={`px-3 py-2 rounded-lg border ${form.category===c.id?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-700 border-gray-300'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Service needed</label>
          <input required value={form.service_type} onChange={e=>update('service_type', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="e.g., faucet leak, brake pads" />
        </div>

        {form.category==='home' ? (
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input value={form.address} onChange={e=>update('address', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="123 Main St" />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle info</label>
            <input value={form.vehicle_info} onChange={e=>update('vehicle_info', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="Make & model" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <input required value={form.customer_name} onChange={e=>update('customer_name', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input required value={form.contact_phone} onChange={e=>update('contact_phone', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={form.contact_email} onChange={e=>update('contact_email', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preferred time</label>
          <input type="datetime-local" required value={form.scheduled_time} onChange={e=>update('scheduled_time', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea value={form.notes} onChange={e=>update('notes', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Anything else we should know?" />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button disabled={loading} className="rounded-lg bg-blue-600 text-white px-5 py-3 font-semibold shadow hover:bg-blue-700 disabled:opacity-60">
          {loading ? 'Booking…' : 'Confirm booking'}
        </button>
        <a href="#pricing" className="rounded-lg bg-white text-gray-900 px-5 py-3 font-semibold shadow hover:bg-gray-100">View pricing</a>
      </div>
    </form>
  )
}

export default BookingForm
