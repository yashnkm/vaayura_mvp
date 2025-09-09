export function BlogHero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-[#36454F] leading-tight mb-6">
          Our <span className="text-brand-grey-green">Blog</span>
        </h1>
        <div className="w-16 h-1 bg-brand-pastel-green rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-brand-dark-grey font-subheading max-w-2xl leading-relaxed">
          Expert insights on air quality, health, and clean living.
        </p>
      </div>
    </section>
  )
}