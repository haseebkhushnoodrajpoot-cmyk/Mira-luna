export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
      <p className="text-center text-[11px] tracking-[0.25em] uppercase text-gold-dark">Our Story</p>
      <h1 className="font-serif text-4xl text-center mt-3 mb-12">About Mira & Luna</h1>

      <div className="aspect-[16/7] w-full overflow-hidden bg-cream mb-12 shadow-sm">
        <img
          src="https://picsum.photos/seed/about/1200/500"
          alt="About Mira & Luna"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6 text-ink/75 leading-relaxed text-[15px]">
        <p>Mira & Luna was born from the beauty of two celestial lights — the brilliance of a star and the quiet glow of the moon.</p>
        <p><span className="font-serif italic text-lg text-ink">Mira</span> represents the radiance and brilliance of starlight (<span className="text-gold">Gold Collection</span>).</p>
        <p><span className="font-serif italic text-lg text-ink">Luna</span> represents the elegance and mystery of moonlight (<span className="text-silver">Silver Collection</span>).</p>
        <p><span className="font-serif italic text-lg text-ink">Celestia</span> expands our universe into the zodiac, celebrating the unique stories written in the stars.</p>
        <p className="font-serif text-xl text-ink pt-2">Mira & Luna is more than jewellery — it is a little piece of the universe, created for you to wear.</p>
      </div>

      <div className="text-center mt-12">
        <a href="/shop" className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] tracking-[0.18em] uppercase bg-ink text-ivory hover:bg-gold hover:text-ink transition-all duration-300 shadow-sm hover:shadow-md">
          Explore The Collections
        </a>
      </div>
    </div>
  )
}