import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageSchema } from "../../schemas/adminFormSchemas";
import { createPackage, updatePackage } from "../../api/packageServices";
import { searchProductsByName } from "../../api/productServices";
import { PackageFormData } from "../../interfaces/dtos";
import AsyncSelect from "react-select/async";
import QuantityModal from "./QuantityModal";

// Componente principal del formulario
const PackageForm: React.FC<{
  initialData?: any;
  onClose: () => void;
}> = ({ initialData, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<PackageFormData>({
    resolver: zodResolver(PackageSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "products",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageErrorMessage, setImageErrorMessage] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSaveQuantity = (quantity: number) => {
    if (selectedProduct) {
      append({
        productId: selectedProduct.value, // ID del producto
        productName: selectedProduct.label, // Nombre del producto
        quantity, // Cantidad seleccionada
      });
      closeModal();
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof PackageFormData, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setImageErrorMessage(
          "Solo se permite cargar archivos .jpg, .jpeg o .png"
        );
        return;
      }
      setImageErrorMessage("");
      setImage(file);
    }
  };

  const handleSearchProducts = async (inputValue: string) => {
    try {
      const response = await searchProductsByName(inputValue);
      return response.map((product: any) => ({
        value: product.productId,
        label: product.name,
      }));
    } catch (error) {
      console.error("Error buscando productos:", error);
      return [];
    }
  };

  const onSubmit = async (data: PackageFormData) => {
    console.log("Datos enviados:", data);

    if (!data.products || data.products.length === 0) {
      alert("Debe agregar al menos un producto.");
      return;
    }

    try {
      const transformedProducts = data.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      }));

      const packageData = { ...data, products: transformedProducts };

      if (initialData) {
        await updatePackage(packageData, image, initialData.packageId);
      } else {
        await createPackage(packageData, image);
      }

      onClose();
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        {initialData ? "Editar Paquete" : "Crear Paquete"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nombre del paquete"
              className="input"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Descripción
            </label>
            <textarea
              id="description"
              placeholder="Descripción del paquete"
              className="text-area"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.description.message)}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              placeholder="Precio del paquete"
              className="input"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.price.message)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <label
              htmlFor="available"
              className="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Disponible
            </label>
            <input
              type="checkbox"
              id="available"
              className="mt-2 w-[20px] h-[20px]"
              {...register("available")}
            />
            {errors.available && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.available.message)}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Buscar Productos
          </label>
          <AsyncSelect
            id="products"
            cacheOptions
            defaultOptions
            loadOptions={handleSearchProducts}
            placeholder="Buscar productos a agregar"
            onChange={(selectedOption: any) => openModal(selectedOption)}
          />
        </div>

        <ul className="mb-4">
          {fields.map((field) => (
            <li key={field.id} className="flex justify-between items-center mb-2">
              <span>Producto: {field.productName}</span>
              <span>Cantidad: {field.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="file"
          >
            Imagen del Paquete
          </label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
            className="hidden"
            id="file"
          />
          {image && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Imagen seleccionada: {image.name}
            </p>
          )}
          {imageErrorMessage && (
            <p className="text-red-500 mt-2">{imageErrorMessage}</p>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {initialData ? "Actualizar" : "Guardar"}
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>

      <QuantityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveQuantity}
      />
    </div>
  );
};

export default PackageForm;
