export function BlogHero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora text-brand-grey-green leading-tight mb-6">
          Our <span className="text-brand-pastel-green">Blog</span>
        </h1>
        <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-brand-dark-grey font-montserrat max-w-2xl mx-auto leading-relaxed">
          Expert insights on air quality, health, and clean living.
        </p>
      </div>
    </section>
  )
}