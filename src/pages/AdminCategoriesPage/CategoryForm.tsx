import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../../schemas/adminFormSchemas"; // Asegúrate de que el esquema esté correctamente importado
import { createCategory, updateCategory } from "../../api/categoryServices";  // Funciones para crear y actualizar categorías
import { CategoryFormData } from "../../interfaces/dtos";  // Define el tipo de datos de la categoría

interface CategoryFormProps {
  initialData?: any; 
  onClose: () => void; 
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
  });

  // Si estamos editando una categoría, seteamos los valores iniciales del formulario
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof CategoryFormData, initialData[key as keyof CategoryFormData]);
      });
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (initialData) {
        const response = await updateCategory(data,initialData.category_id);
        console.log(response);
      } else {
        const response = await createCategory(data);
        console.log(response);
      }
      onClose();
    } catch (error) {
      console.error("Error al crear o actualizar la categoría:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        {initialData ? "Editar Categoría" : "Crear Categoría"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">
            Nombre (*)
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nombre de la categoría"
            className="input"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Descripción de la categoría"
            className="text-area"
            {...register("description")}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{String(errors.description.message)}</p>}
        </div>

        <div className="mt-6 flex justify-between">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            {initialData ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;



