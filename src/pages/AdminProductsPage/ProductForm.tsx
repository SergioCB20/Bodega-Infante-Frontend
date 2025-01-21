import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../../schemas/adminFormSchemas";
import { createProduct, updateProduct } from "../../api/productServices";
import { getAllCategories } from "../../api/categoryServices"; // Importa tu función de fetch
import Select from "react-select";

interface ProductFormProps {
  initialData?: any;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageErrorMessage, setImageErrorMessage] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]); // Estado para almacenar las categorías

  // Usamos react-hook-form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    // Obtener las categorías al montar el componente
    const getCategories = async () => {
      const response = await getAllCategories();
      console.log(response);
      setCategories(response); // Guardamos las categorías en el estado
    };

    getCategories();

    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
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

  const onSubmit = async (data: any) => {
    try {
      // Enviar el formulario con categoryName en lugar de categoryId
      const productData = {
        ...data,
        categoryName: data.categoryName, // Aseguramos que categoryName se mande en lugar de categoryId
      };
      
      if (initialData) {
        const response = await updateProduct(initialData.productId,productData, image);
        console.log(response);
      } else {
        const response = await createProduct(productData, image);
        console.log(response);
      }
      onClose();
    } catch (error) {
      console.error("Error al crear o actualizar el producto:", error);
    }
  };

  // Preparar opciones para react-select
  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        {initialData ? "Editar Producto" : "Crear Producto"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        {/* Nombre */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="name"
          >
            Nombre (*)
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nombre del producto"
            className="input"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="description"
          >
            Descripción 
          </label>
          <textarea
            id="description"
            placeholder="Descripción del producto"
            className="text-area"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.description.message)}
            </p>
          )}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="price"
          >
            Precio (S/.) (*)
          </label>
          <input
            type="number"
            id="price"
            placeholder="Precio del producto"
            className="input"
            {...register("price", { valueAsNumber: true })}
            min={0}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.price.message)}
            </p>
          )}
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="categoryName"
          >
            Categoría (*)
          </label>
          <Select
            id="categoryName"
            options={categoryOptions} // Opciones correctamente formateadas
            {...register("categoryName")} // Usamos categoryName en lugar de categoryId
            placeholder="Buscar o seleccionar categoría"
            isSearchable // Permite la búsqueda en el dropdown
            getOptionLabel={(e) => e.label} // Extrae correctamente el 'label'
            getOptionValue={(e) => e.value} // Extrae correctamente el 'value'
            value={categoryOptions.find(
              (option) =>
                option.value === (initialData ? initialData.categoryName : "")
            )}
            onChange={(selectedOption) =>
              setValue("categoryName", selectedOption?.value)
            }
          />

          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.categoryName.message)}
            </p>
          )}
        </div>

        {/* Imagen */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="file"
          >
            Imagen del Producto 
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
    </div>
  );
};

export default ProductForm;
