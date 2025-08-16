export function ProductHero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight mb-6">
          Our <span className="text-brand-pastel-green">Products</span>
        </h1>
        <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto leading-relaxed">
          Discover our range of premium air purification solutions designed for every space and need.
        </p>
      </div>
    </section>
  )
}