/** API uses MongoDB ObjectIds as strings. */
export type ApiTour = {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  date: string;
  duration: string;
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
