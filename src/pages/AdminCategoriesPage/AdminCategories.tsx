import { useState } from "react";
import AdminTable from "../../components/AdminTable";
import { getAllCategories, deleteCategory } from "../../api/categoryServices";
import CategoryForm from "./CategoryForm";

const AdminCategoriesPage = () => {
  const [openCreateCategoryForm, setOpenCreateCategoryForm] = useState(false);
  const [openUpdateCategoryForm, setOpenUpdateCategoryForm] = useState(false);
  const [openDeleteCategoryConfirm, setOpenDeleteCategoryConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState<any>(null);

  const fetchCategories = async () => {
    return await getAllCategories();
  };

  // Función para manejar la eliminación de categoría
  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete.category_id);
      setOpenDeleteCategoryConfirm(false);
      setCategoryToDelete(null);
      window.location.reload();
    }
  };

  return (
    <section className="w-full">
      <AdminTable
        title="Categorías"
        subtitle="Gestiona tus Categorías"
        fields={[
          { name: "category_id", displayedName: "ID" },
          { name: "name", displayedName: "Nombre" },
          { name: "description", displayedName: "Descripción" },
        ]}
        actions={[
          {
            name: "Modificar",
            onClick: (category: any) => {
              setCategoryToUpdate(category); 
              setOpenUpdateCategoryForm(true);
            },
          },
          {
            name: "Eliminar",
            onClick: (category: any) => {
              setCategoryToDelete(category); // Establece la categoría a eliminar
              setOpenDeleteCategoryConfirm(true); // Abre el modal de confirmación de eliminación
            },
          }
        ]}
        getData={fetchCategories}
        setOpenCreationFormModal={setOpenCreateCategoryForm}
      />

      {/* Modal para crear categoría */}
      {openCreateCategoryForm && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <CategoryForm onClose={() => setOpenCreateCategoryForm(false)} />
          </div>
        </div>
      )}

      {/* Modal para actualizar categoría */}
      {openUpdateCategoryForm && categoryToUpdate && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <CategoryForm
              onClose={() => setOpenUpdateCategoryForm(false)} 
              initialData={categoryToUpdate} 
            />
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar categoría */}
      {openDeleteCategoryConfirm && categoryToDelete && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas eliminar esta categoría?</h3>
            <p className="mb-4">Esta acción no se puede deshacer y la categoría será eliminada permanentemente.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setOpenDeleteCategoryConfirm(false)} // Cierra el modal si no confirma
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDeleteCategory} // Ejecuta la eliminación
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminCategoriesPage;



