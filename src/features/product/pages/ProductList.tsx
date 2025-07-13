import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../type";
import {
  editProduct,
  fetchProducts,
  removeProduct,
} from "../slice/productSlice";
import FilterSection, {
  type FilterConfig,
} from "../../../components/table/FilterSection";
import { DataTable, type Column } from "../../../components/table/Table";
import Pagination from "../../../components/table/Pagination";
import AddProductAction from "../components/AddProductButton";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../components/modal/Modal";
import ProductForm from "../components/ProductForm";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentEditingProduct, setCurrentEditingProduct] =
    useState<Product | null>();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchKeyword = searchParams.get("search")?.toLowerCase() || "";

  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    return items.filter((item: Product) =>
      item.name.toLowerCase().includes(searchKeyword)
    );
  }, [items, searchKeyword]);

  const paginatedData = useMemo(() => {
    if (currentPage < 1) {
      return [];
    }
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const handleDelete = (product: Product) => {
    dispatch(removeProduct(product.id));
  };

  const columns: Column<Product>[] = [
    { key: "name", label: "Nama Produk", sortable: true },
    {
      key: "price",
      label: "Harga",
      sortable: true,
      render: (val: any) => `Rp ${val}`,
    },
  ];

  const filterConfigs: FilterConfig[] = [
    {
      id: "search",
      type: "search",
      placeholder: "Cari nama produk...",
    },
  ];

  return (
    <>
      <div className="px-4 md:px-16 py-8">
        <div className="flex justify-between flex-wrap-reverse gap-2">
          <AddProductAction></AddProductAction>
          <FilterSection filterConfigs={filterConfigs} />
        </div>

        <DataTable<Product>
          data={paginatedData}
          columns={columns}
          showIndex
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onDelete={handleDelete}
          onEdit={(product) => setCurrentEditingProduct(product)}
          isLoading={loading}
        />

        <Pagination
          currentPage={currentPage}
          totalPage={Math.ceil(filteredData.length / rowsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
      <AnimatePresence>
        {currentEditingProduct != null && (
          <Modal
            className="w-[30rem] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            onClose={() => setCurrentEditingProduct(null)}
          >
            <ProductForm
              title="Edit Product"
              initialData={currentEditingProduct}
              onSubmit={async (data) => {
                await dispatch(
                  editProduct({
                    ...data,
                    id: currentEditingProduct.id,
                  })
                );
                setCurrentEditingProduct(null);
              }}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
