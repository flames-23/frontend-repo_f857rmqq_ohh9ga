import { useEffect, useState } from 'react'

function LiveTrack({ technicianId }) {
  const [pos, setPos] = useState({ lat: 0, lng: 0 })
  const [err, setErr] = useState('')
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (!technicianId) return
    let timer
    const poll = async () => {
      try {
        const res = await fetch(`${backend}/track/${technicianId}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setPos(data)
      } catch (e) {
        setErr('Waiting for technician location…')
      }
      timer = setTimeout(poll, 3000)
    }
    poll()
    return () => clearTimeout(timer)
  }, [technicianId])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-2">Live technician tracking</h3>
      {err && <p className="text-sm text-gray-600 mb-2">{err}</p>}
      <div className="h-56 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl">📍</div>
          <div className="mt-2 text-gray-700 font-mono">lat {pos.lat?.toFixed?.(5) ?? pos.lat}, lng {pos.lng?.toFixed?.(5) ?? pos.lng}</div>
          <div className="text-xs text-gray-500">Auto-refreshing every 3s</div>
        </div>
      </div>
    </div>
  )
}

export default LiveTrack
