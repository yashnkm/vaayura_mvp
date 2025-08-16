export function ProductCatalog() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product cards will be implemented */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-heading text-brand-grey-green mb-4">Product Coming Soon</h3>
            <p className="text-brand-dark-grey font-body">
              Our product lineup is being finalized. Stay tuned for world-class air purification solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}