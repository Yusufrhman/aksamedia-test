import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductForm from "./ProductForm";
import Modal from "../../../components/modal/Modal";
import MainButton from "../../../components/buttons/MainButton";
import { Plus } from "lucide-react";
import { createProduct } from "../slice/productSlice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../store/store";

export default function AddProductAction({}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <AnimatePresence>
        {isAddOpen && (
          <Modal
            className="w-[30rem]"
            onClose={() => setIsAddOpen(false)}
          >
            <ProductForm
              title="Add New Product"
              onSubmit={async (data) => {
                await dispatch(
                  createProduct({
                    ...data,
                    id: Date.now(),
                  })
                );
                setIsAddOpen(false);
              }}
            />
          </Modal>
        )}
      </AnimatePresence>
      <MainButton
        type="button"
        onClick={() => setIsAddOpen(true)}
        className="w-fit h-full px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-400"
      >
        <Plus className="text-white" size={24} />
      </MainButton>
    </>
  );
}
