import { initDB } from "../../../utils/indexedDB";
import type { Product } from "../type";

const STORE_NAME = import.meta.env.VITE_STORE_NAME || "default_store";

// Fungsi mengambil semua produk
export const getAllProducts = async (): Promise<Product[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

// Fungsi mengambil produk berdasarkan ID
export const getProductById = async (
  id: number | string
): Promise<Product | undefined> => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

// Fungsi menambahkan produk
export const addProduct = async (product: Product): Promise<IDBValidKey> => {
  const db = await initDB();
  return db.add(STORE_NAME, product);
};

// Fungsi memperbarui produk
export const updateProduct = async (product: Product): Promise<IDBValidKey> => {
  const db = await initDB();
  return db.put(STORE_NAME, product);
};

// Fungsi menghapus produk
export const deleteProduct = async (id: number | string): Promise<void> => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
