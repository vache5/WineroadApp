import Image from "next/image";

export default function SignatureJourneysSection() {
  return (
    <section className="bg-[#151313] px-6 py-20 text-gray-300">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <p className="tracking-[0.3em] text-sm uppercase text-gray-400">
            OUR SIGNATURE JOURNEYS
          </p>
          <h2 className="text-3xl sm:text-4xl font-playfair text-white tracking-wide">
            Our Signature Journeys
          </h2>
        </div>

        {/* MAIN GRID  — LEFT (Overview) + RIGHT (Booking) */}
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-12 order-2 lg:order-1">
            {/* Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-playfair text-white">Overview</h3>
                <span className="text-[#D1B06B] text-xl">📜</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Armenia — the cradle of winemaking, where the volcanic valleys and
                ancient traditions create unforgettable journeys. Explore historic
                vineyards, taste exquisite wines, and enjoy breathtaking landscapes.
              </p>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-playfair text-white">What's Included</h3>
                <span className="text-[#D1B06B] text-xl">🍇</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Vineyard tours, wine tastings, Armenian lunch, transportation,
                cultural visits, and exclusive access to premium wine cellars.
              </p>
            </div>

            {/* Guest Reviews */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-playfair text-white">
                  Guest Reviews
                </h3>
                <span className="text-[#D1B06B] text-xl">⭐</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                “A luxurious, unforgettable experience with exceptional wine,
                scenery, and cultural stories from knowledgeable guides.”
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* BOOKING BOX */}
            <div className="bg-[#2B1D1A] p-6 rounded-2xl shadow-lg space-y-5">
              <h4 className="text-xl font-playfair text-white">Booking Box</h4>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-[#D1B06B]">Experience</label>
                  <select className="mt-1 w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200">
                    <option>Select Tour</option>
                    <option>Armenian Wine Route</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-[#D1B06B]">Date</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#D1B06B]">Destination</label>
                  <select className="mt-1 w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200">
                    <option>Choose Destination</option>
                    <option>Vayots Dzor</option>
                    <option>Ararat Valley</option>
                  </select>
                </div>

                <p className="text-sm text-gray-300 pt-2">
                  Price From:{" "}
                  <span className="text-[#D1B06B] font-medium">$180</span> / person
                </p>
              </div>
            </div>

            {/* PHOTO GALLERY */}
            <div className="bg-[#2B1D1A] p-6 rounded-2xl shadow-lg space-y-5">
              <h4 className="text-xl font-playfair text-white">Photo Gallery</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="space-y-2">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/images/win3.webp"
                      alt="Vineyard"
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-300">
                    Golden vineyard landscapes at sunset.
                  </p>
                  <button className="rounded-lg bg-[#D1B06B] px-4 py-2 text-xs font-semibold text-black">
                    VIEW TOUR
                  </button>
                </div>

                {/* Card 2 */}
                <div className="space-y-2">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/images/wine2.jpg"
                      alt="Wine Glasses"
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-300">
                    Exclusive wine-tasting sessions.
                  </p>
                  <button className="rounded-lg bg-[#D1B06B] px-4 py-2 text-xs font-semibold text-black">
                    VIEW TOUR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
