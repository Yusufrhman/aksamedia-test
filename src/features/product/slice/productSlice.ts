import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../type";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/productService";

// State type
interface ProductState {
  items: Product[];
  selected?: Product;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

// Thunks
export const fetchProducts = createAsyncThunk("product/fetchAll", async () => {
  return await getAllProducts();
});

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id: number | string) => {
    return await getProductById(id);
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (product: Product) => {
    await addProduct(product);
    return product;
  }
);

export const editProduct = createAsyncThunk(
  "product/update",
  async (product: Product) => {
    await updateProduct(product);
    return product;
  }
);

export const removeProduct = createAsyncThunk(
  "product/delete",
  async (id: number | string) => {
    await deleteProduct(id);
    return id;
  }
);

// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat produk.";
      })

      // fetchProductById
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // createProduct
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // editProduct
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // removeProduct
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearSelected } = productSlice.actions;
export default productSlice.reducer;
