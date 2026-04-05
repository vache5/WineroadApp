/** API uses MongoDB ObjectIds as strings. */
export type TourLocaleBlock = {
  title: string;
  description: string;
  duration: string;
};

export type TourLocales = {
  en: TourLocaleBlock;
  ru: TourLocaleBlock;
  am: TourLocaleBlock;
};

export type ApiTour = {
  id: string;
  /** Title, description, and duration in English, Russian, and Armenian. */
  locales: TourLocales;
  pricePerPerson: number;
  /** Earliest bookable day (legacy + convenience). */
  date: string;
  /** Days when booking is allowed (YYYY-MM-DD), set in admin. */
  bookableDates: string[];
  mainImage: string;
  galleryImages: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiOrder = {
  id: string;
  tourId: string;
  userName: string;
  userEmail: string;
  numberOfPeople: number;
  totalPrice: number;
  createdAt: string;
  tour: ApiTour;
};

export type AdminStats = {
  tourCount: number;
  orderCount: number;
  revenueTotal: number;
};

export type AdminLoginResponse = {
  token: string;
  expiresIn: string;
  role: "admin";
};

export type ApiGalleryItem = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
