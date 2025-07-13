import { openDB } from "idb";
import { Category, type Product } from "../features/product/type";

const DB_NAME = import.meta.env.VITE_DB_NAME || "default_db";
const DB_VERSION = Number(import.meta.env.VITE_DB_VERSION) || 1;
const STORE_NAME = import.meta.env.VITE_STORE_NAME || "default_store";

// Optional: validasi
if (!DB_NAME || !STORE_NAME) {
  throw new Error("Missing DB_NAME or STORE_NAME in .env file");
}


// Dummy product data
export const dummyProducts: Product[] = [
  { id: 1, name: "Laptop A", price: 15000000, category: Category.Elektronik },
  {
    id: 2,
    name: "Smartphone B",
    price: 7000000,
    category: Category.Elektronik,
  },
  { id: 3, name: "Headset C", price: 500000, category: Category.Aksesoris },
  { id: 4, name: "Mouse D", price: 250000, category: Category.Aksesoris },
  { id: 5, name: "Keyboard E", price: 600000, category: Category.Aksesoris },
  { id: 6, name: "Monitor F", price: 2000000, category: Category.Elektronik },
  { id: 7, name: "Tablet G", price: 9000000, category: Category.Elektronik },
  { id: 8, name: "Printer H", price: 1200000, category: Category.Elektronik },
  { id: 9, name: "Kamera I", price: 5000000, category: Category.Elektronik },
  { id: 10, name: "Lensa J", price: 3000000, category: Category.Elektronik },
  { id: 11, name: "Meja Kerja K", price: 800000, category: Category.Furniture },
  {
    id: 12,
    name: "Kursi Kantor L",
    price: 1500000,
    category: Category.Furniture,
  },
  {
    id: 13,
    name: "Lampu Belajar M",
    price: 300000,
    category: Category.Furniture,
  },
  { id: 14, name: "Buku N", price: 75000, category: Category.Edukasi },
  { id: 15, name: "Tas Ransel O", price: 400000, category: Category.Aksesoris },
  { id: 16, name: "Powerbank P", price: 350000, category: Category.Elektronik },
  {
    id: 17,
    name: "Hard Disk Q",
    price: 1000000,
    category: Category.Elektronik,
  },
  { id: 18, name: "Flashdisk R", price: 150000, category: Category.Elektronik },
  {
    id: 19,
    name: "Jam Tangan S",
    price: 1200000,
    category: Category.Aksesoris,
  },
  { id: 20, name: "Sepatu T", price: 600000, category: Category.Fashion },
  { id: 21, name: "Topi U", price: 100000, category: Category.Fashion },
  { id: 22, name: "Kacamata V", price: 300000, category: Category.Aksesoris },
  { id: 23, name: "Rak Buku W", price: 900000, category: Category.Furniture },
  { id: 24, name: "Pena X", price: 25000, category: Category.Edukasi },
  { id: 25, name: "Notebook Y", price: 50000, category: Category.Edukasi },
  {
    id: 26,
    name: "Smartwatch Z",
    price: 2500000,
    category: Category.Elektronik,
  },
  { id: 27, name: "Earbuds AA", price: 600000, category: Category.Elektronik },
  { id: 28, name: "Koper BB", price: 1200000, category: Category.Travel },
  { id: 29, name: "Tenda CC", price: 750000, category: Category.Outdoor },
  { id: 30, name: "Sepeda DD", price: 3000000, category: Category.Outdoor },
  { id: 31, name: "Matras EE", price: 250000, category: Category.Outdoor },
  {
    id: 32,
    name: "Lampu Hias FF",
    price: 350000,
    category: Category.Furniture,
  },
  { id: 33, name: "Stiker GG", price: 20000, category: Category.Dekorasi },
  { id: 34, name: "Karpet HH", price: 700000, category: Category.Furniture },
  { id: 35, name: "Cermin II", price: 900000, category: Category.Dekorasi },
  {
    id: 36,
    name: "Game Console JJ",
    price: 4500000,
    category: Category.Elektronik,
  },
  {
    id: 37,
    name: "Controller KK",
    price: 800000,
    category: Category.Elektronik,
  },
  { id: 38, name: "Setrika LL", price: 300000, category: Category.Elektronik },
  { id: 39, name: "Blender MM", price: 600000, category: Category.Elektronik },
  {
    id: 40,
    name: "Dispenser NN",
    price: 1200000,
    category: Category.Elektronik,
  },
  {
    id: 41,
    name: "Vacuum Cleaner OO",
    price: 2500000,
    category: Category.Elektronik,
  },
  { id: 42, name: "Toaster PP", price: 400000, category: Category.Elektronik },
  {
    id: 43,
    name: "Microwave QQ",
    price: 1500000,
    category: Category.Elektronik,
  },
  { id: 44, name: "AC RR", price: 4500000, category: Category.Elektronik },
  { id: 45, name: "Kulkas SS", price: 3000000, category: Category.Elektronik },
  {
    id: 46,
    name: "Rice Cooker TT",
    price: 800000,
    category: Category.Elektronik,
  },
  { id: 47, name: "Bantal UU", price: 200000, category: Category.Furniture },
  { id: 48, name: "Selimut VV", price: 500000, category: Category.Furniture },
  {
    id: 49,
    name: "Jam Dinding WW",
    price: 350000,
    category: Category.Dekorasi,
  },
  { id: 50, name: "Gitar XX", price: 1500000, category: Category.Hobi },
];

// Inisialisasi IndexedDB
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Fungsi untuk memeriksa dan mengisi dummy data jika belum ada
export const seedDBIfEmpty = async () => {
  const db = await initDB();
  const count = await db.count(STORE_NAME);
  if (count === 0) {
    const tx = db.transaction(STORE_NAME, "readwrite");
    for (const product of dummyProducts) {
      await tx.store.put(product);
    }
    await tx.done;
  }
};
