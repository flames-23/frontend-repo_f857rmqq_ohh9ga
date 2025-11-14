import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section id="home" className="relative h-[80vh] sm:h-[85vh] lg:h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-sm bg-white/40 rounded-2xl p-6 sm:p-10 max-w-2xl shadow-xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Fast, high‑quality repairs—at transparent prices
            </h1>
            <p className="mt-4 text-gray-700 text-base sm:text-lg">
              On‑call technicians for home and vehicle services across the city. Book in seconds, track arrival in real time, rate your experience, and pay securely.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#book" className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-5 py-3 font-semibold shadow hover:bg-blue-700 transition-colors">
                Book a repair
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-5 py-3 font-semibold shadow hover:bg-gray-100 transition-colors">
                See pricing
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </section>
  )
}

export default Hero
