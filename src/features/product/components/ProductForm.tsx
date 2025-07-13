import { useState, type ChangeEvent, type FormEvent } from "react";
import { Category, type CategoryType, type Product } from "../type";
import Input from "../../../components/inputs/Input";
import MainButton from "../../../components/buttons/MainButton";

interface FormError {
  name: string;
  price: string;
  category: string;
}

interface ProductFormProps {
  initialData?: Omit<Product, "id">;
  onSubmit: (data: Omit<Product, "id">) => void;
  title?: string;
  submitText?: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  title = "Product Form",
  submitText = "Save",
}: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>(
    initialData || {
      name: "",
      price: 0,
      category: "" as CategoryType,
    }
  );

  const [error, setError] = useState<FormError>({
    name: "",
    price: "",
    category: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ name: "", price: "", category: "" });

    const errors: Partial<FormError> = {};
    if (!formData.name) errors.name = "Product name is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.category) errors.category = "Category is required";

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? Number(value)
          : name === "category"
          ? (value as CategoryType)
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h2>
      <Input
        id="name"
        label="Product name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={error.name}
      />
      <Input
        id="price"
        label="Price"
        type="number"
        name="price"
        value={formData.price.toString()}
        onChange={handleChange}
        error={error.price}
      />
      <div>
        <label htmlFor="category" className={`text-sm font-light`}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`p-2 border border-neutral-200 rounded-lg text-xs sm:text-sm md:text-base h-10 w-full bg-white dark:bg-neutral-800 mt-2  ${
            error.category && "focus:border-red-500 border-red-500"
          }`}
        >
          <option value="">Semua Kategori</option>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {error.category && (
          <p className="text-red-600 text-xs pl-1 mt-1">{error.category}</p>
        )}
      </div>

      <MainButton type="submit" className="w-full mt-2">
        {submitText}
      </MainButton>
    </form>
  );
}
