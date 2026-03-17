export interface Tour {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  duration: number; // in hours
  location: string;
  maxPeople: number;
  gallery: string[];
  includes: string[];
  excludes: string[];
  features: {
    icon: string;
    label: string;
  }[];
}

export const toursData: Tour[] = [
  {
    id: 1,
    title: "From the Pink City to the Blue Lake: Yerevan to Sevan",
    description: "Experience the journey from Yerevan's pink architecture to the stunning blue waters of Lake Sevan.",
    fullDescription: "Embark on an unforgettable journey from Armenia's capital city, Yerevan, known for its distinctive pink tuff stone architecture, to the breathtaking Lake Sevan, one of the largest high-altitude lakes in the world. This tour combines urban exploration with natural beauty, offering stunning views, cultural insights, and opportunities for photography and relaxation.",
    price: 68000,
    image: "/images/win3.webp",
    duration: 8,
    location: "Yerevan, Lake Sevan",
    maxPeople: 12,
    gallery: [
      "/images/win3.webp",
      "/images/wine2.jpg",
      "/images/armenian wine.jpg",
      "/images/win3.webp",
    ],
    includes: [
      "Professional English-speaking guide",
      "Transportation in comfortable vehicle",
      "Entrance fees to all attractions",
      "Traditional Armenian lunch",
      "Bottled water",
      "Hotel pickup and drop-off",
    ],
    excludes: [
      "Personal expenses",
      "Gratuities (optional)",
      "Additional food and beverages",
      "Travel insurance",
    ],
    features: [
      { icon: "🚗", label: "Transportation" },
      { icon: "🍽️", label: "Lunch Included" },
      { icon: "📸", label: "Photo Stops" },
      { icon: "🏛️", label: "Cultural Sites" },
      { icon: "🌊", label: "Lake Views" },
      { icon: "👥", label: "Small Groups" },
    ],
  },
  {
    id: 2,
    title: "Breath of Centuries: Garni, Geghard, Sevan, Khor Virap",
    description: "Discover ancient monasteries and temples that have stood for centuries.",
    fullDescription: "Step back in time as you explore Armenia's most iconic historical sites. Visit the pagan Temple of Garni, the rock-hewn Geghard Monastery, the serene Lake Sevan, and the legendary Khor Virap monastery with its stunning views of Mount Ararat. This comprehensive tour showcases the rich history and spiritual heritage of Armenia.",
    price: 70000,
    image: "/images/wine2.jpg",
    duration: 9,
    location: "Garni, Geghard, Sevan, Khor Virap",
    maxPeople: 15,
    gallery: [
      "/images/wine2.jpg",
      "/images/armenian wine.jpg",
      "/images/win3.webp",
      "/images/wine2.jpg",
    ],
    includes: [
      "Expert local guide",
      "Air-conditioned vehicle",
      "All entrance tickets",
      "Traditional Armenian lunch",
      "Bottled water",
      "Hotel transfers",
    ],
    excludes: [
      "Personal purchases",
      "Tips for guide and driver",
      "Extra snacks",
      "Travel insurance",
    ],
    features: [
      { icon: "🏛️", label: "Ancient Temples" },
      { icon: "⛪", label: "Monasteries" },
      { icon: "🍽️", label: "Lunch Included" },
      { icon: "📸", label: "Scenic Views" },
      { icon: "📚", label: "Historical Guide" },
      { icon: "🚗", label: "Comfortable Transport" },
    ],
  },
  {
    id: 3,
    title: "Armenian Wine Route",
    description: "Explore the rich heritage of Armenian winemaking through historic vineyards.",
    fullDescription: "Discover Armenia's ancient winemaking traditions on this immersive wine tour. Visit historic vineyards, learn about traditional and modern winemaking techniques, and enjoy tastings of premium Armenian wines. Experience the unique terroir and meet passionate winemakers who continue centuries-old traditions.",
    price: 85000,
    image: "/images/armenian wine.jpg",
    duration: 6,
    location: "Vayots Dzor, Ararat Valley",
    maxPeople: 10,
    gallery: [
      "/images/armenian wine.jpg",
      "/images/win3.webp",
      "/images/wine2.jpg",
      "/images/armenian wine.jpg",
    ],
    includes: [
      "Wine expert guide",
      "Transportation",
      "Vineyard tours",
      "Wine tastings (5+ wines)",
      "Cheese and bread pairing",
      "Traditional lunch",
      "Hotel pickup/drop-off",
    ],
    excludes: [
      "Additional wine purchases",
      "Personal expenses",
      "Gratuities",
      "Travel insurance",
    ],
    features: [
      { icon: "🍷", label: "Wine Tastings" },
      { icon: "🍇", label: "Vineyard Tours" },
      { icon: "🍽️", label: "Food Pairing" },
      { icon: "👨‍🌾", label: "Meet Winemakers" },
      { icon: "📚", label: "Wine Education" },
      { icon: "🚗", label: "Transportation" },
    ],
  },
  {
    id: 4,
    title: "Vineyard & Monastery Tour",
    description: "Combine wine tasting with visits to ancient monasteries.",
    fullDescription: "A perfect blend of spiritual and sensory experiences. Visit ancient monasteries that have been centers of faith for centuries, then explore nearby vineyards where monks once made wine. This unique tour combines cultural heritage with wine appreciation in Armenia's most beautiful regions.",
    price: 75000,
    image: "/images/win3.webp",
    duration: 5,
    location: "Various Regions",
    maxPeople: 12,
    gallery: [
      "/images/win3.webp",
      "/images/wine2.jpg",
      "/images/armenian wine.jpg",
      "/images/win3.webp",
    ],
    includes: [
      "Bilingual guide",
      "Transportation",
      "Monastery visits",
      "Vineyard tour",
      "Wine tasting",
      "Light lunch",
      "Hotel transfers",
    ],
    excludes: [
      "Wine purchases",
      "Personal expenses",
      "Tips",
      "Travel insurance",
    ],
    features: [
      { icon: "⛪", label: "Monasteries" },
      { icon: "🍷", label: "Wine Tasting" },
      { icon: "🍽️", label: "Lunch" },
      { icon: "📸", label: "Photo Opportunities" },
      { icon: "📚", label: "Cultural History" },
      { icon: "🚗", label: "Transport" },
    ],
  },
  {
    id: 5,
    title: "Half Day Wine Experience",
    description: "A quick introduction to Armenian wines and culture.",
    fullDescription: "Perfect for those with limited time, this half-day tour offers a condensed but comprehensive introduction to Armenian wine culture. Visit a local winery, learn about the winemaking process, and enjoy tastings of selected wines paired with local cheeses and bread.",
    price: 45000,
    image: "/images/wine2.jpg",
    duration: 4,
    location: "Yerevan Area",
    maxPeople: 8,
    gallery: [
      "/images/wine2.jpg",
      "/images/armenian wine.jpg",
      "/images/win3.webp",
      "/images/wine2.jpg",
    ],
    includes: [
      "Local guide",
      "Transportation",
      "Winery visit",
      "Wine tasting (3 wines)",
      "Cheese pairing",
      "Hotel transfers",
    ],
    excludes: [
      "Lunch",
      "Additional purchases",
      "Tips",
      "Travel insurance",
    ],
    features: [
      { icon: "🍷", label: "Wine Tasting" },
      { icon: "🍇", label: "Winery Tour" },
      { icon: "🧀", label: "Cheese Pairing" },
      { icon: "⏰", label: "Half Day" },
      { icon: "🚗", label: "Transport" },
      { icon: "👥", label: "Small Group" },
    ],
  },
  {
    id: 6,
    title: "Full Day Cultural & Wine Tour",
    description: "Comprehensive tour combining culture, history, and wine.",
    fullDescription: "The ultimate Armenian experience combining the best of culture, history, and wine. Visit historical sites, explore ancient monasteries, enjoy traditional cuisine, and discover the world of Armenian wine. This full-day adventure provides a complete immersion into Armenian heritage and hospitality.",
    price: 95000,
    image: "/images/armenian wine.jpg",
    duration: 10,
    location: "Multiple Locations",
    maxPeople: 12,
    gallery: [
      "/images/armenian wine.jpg",
      "/images/win3.webp",
      "/images/wine2.jpg",
      "/images/armenian wine.jpg",
    ],
    includes: [
      "Expert guide",
      "Full transportation",
      "All entrance fees",
      "Multiple site visits",
      "Traditional lunch",
      "Wine tastings",
      "Cultural experiences",
      "Hotel transfers",
    ],
    excludes: [
      "Personal expenses",
      "Additional purchases",
      "Gratuities",
      "Travel insurance",
    ],
    features: [
      { icon: "🏛️", label: "Cultural Sites" },
      { icon: "🍷", label: "Wine Tastings" },
      { icon: "🍽️", label: "Full Lunch" },
      { icon: "📸", label: "Photo Stops" },
      { icon: "📚", label: "Expert Guide" },
      { icon: "🚗", label: "Full Day" },
    ],
  },
];

export function getTourById(id: number | string): Tour | undefined {
  const tourId = typeof id === "string" ? parseInt(id, 10) : id;
  return toursData.find((tour) => tour.id === tourId);
}

export function getAllTourIds(): number[] {
  return toursData.map((tour) => tour.id);
}

