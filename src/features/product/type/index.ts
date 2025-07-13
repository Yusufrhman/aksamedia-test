export type CategoryType =
  | "Elektronik"
  | "Aksesoris"
  | "Furniture"
  | "Edukasi"
  | "Fashion"
  | "Travel"
  | "Outdoor"
  | "Dekorasi"
  | "Hobi";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: CategoryType;
};

export const Category = {
  Elektronik: "Elektronik",
  Aksesoris: "Aksesoris",
  Furniture: "Furniture",
  Edukasi: "Edukasi",
  Fashion: "Fashion",
  Travel: "Travel",
  Outdoor: "Outdoor",
  Dekorasi: "Dekorasi",
  Hobi: "Hobi",
} as const;
  