export type Language = 'ar' | 'en';

export type SpiceLevel = 'mild' | 'medium' | 'spicy';

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number; // in EGP
  category: 'skillets' | 'grills' | 'sandwiches' | 'claypots' | 'sides' | 'drinks';
  portion?: string;
  portionOptions?: {
    nameAr: string;
    nameEn: string;
    price: number;
  }[];
  tagAr?: string;
  tagEn?: string;
  isSignature?: boolean;
  isPopular?: boolean;
  imageUrl?: string;
  spicyAvailable?: boolean;
  calories?: string;
  prepTime?: string;
  ingredientsAr?: string[];
  ingredientsEn?: string[];
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorTitleAr: string;
  authorTitleEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  commentAr: string;
  commentEn: string;
  avatarLetter: string;
  verified: boolean;
  source: 'Google Maps' | 'Cairo360' | 'Visitor';
  highlightDishAr?: string;
  highlightDishEn?: string;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  selectedPortion?: {
    nameAr: string;
    nameEn: string;
    price: number;
  };
  spiceLevel: SpiceLevel;
  specialInstructions?: string;
  quantity: number;
}

export interface CustomSkilletOrder {
  meats: string[]; // e.g. ['camel_liver', 'camel_sausage']
  size: 'single' | 'double' | 'family';
  sauceStyle: string;
  spiceLevel: SpiceLevel;
  sides: string[];
  notes: string;
}

export interface BranchInfo {
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  formattedPhone: string;
  hoursAr: string;
  hoursEn: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
