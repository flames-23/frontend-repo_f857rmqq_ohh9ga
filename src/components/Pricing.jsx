const tiers = [
  { name: 'Diagnostic Visit', price: 29, desc: 'Upfront diagnosis and quote applied to repair', features: ['Same-day slots', 'Up to 30 min inspection'] },
  { name: 'Standard Repair', price: 99, desc: 'Most minor home & vehicle repairs', features: ['Parts at cost', '30‑day workmanship warranty'] },
  { name: 'Premium Repair', price: 189, desc: 'Complex jobs, priority scheduling', features: ['Senior technician', '90‑day warranty', 'Priority arrival window'] },
]

function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Transparent pricing</h2>
        <p className="text-gray-600 text-center mt-2 mb-10">No surprises. Parts are billed at cost with receipts.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-2xl shadow-xl bg-white p-6">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-gray-600">{t.desc}</p>
              <div className="mt-4 text-4xl font-extrabold tracking-tight">${t.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {t.features.map(f => (<li key={f}>• {f}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
