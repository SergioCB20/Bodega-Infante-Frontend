import { useState } from "react";
import AdminTable from "../../components/AdminTable";
import { getAllProducts, deleteProduct } from "../../api/productServices";
import ProductForm from "./ProductForm";

const AdminProductsPage = () => {
  const [openCreateProductForm, setOpenCreateProductForm] = useState(false);
  const [openUpdateProductForm, setOpenUpdateProductForm] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false); // Estado para el modal de eliminación
  const [productToUpdate, setProductToUpdate] = useState<any>(null); // Estado para almacenar el producto a actualizar
  const [productToDelete, setProductToDelete] = useState<any>(null); // Estado para almacenar el producto a eliminar

  const fetchProducts = async () => {
    return await getAllProducts();
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.productId);
      setOpenDeleteProductModal(false); // Cerrar el modal después de eliminar el producto
    }
  };

  return (
    <section className="w-full">
      <AdminTable
        title="Productos"
        subtitle="Gestiona tus productos"
        fields={[
          { name: "productId", displayedName: "ID" },
          { name: "name", displayedName: "Nombre" },
          { name: "description", displayedName: "Descripción" },
          { name: "price", displayedName: "Precio (S/.)" },
          { name: "categoryName", displayedName: "Categoría" },
        ]}
        actions={[
          {
            name: "Modificar",
            onClick: (product: any) => {
              setProductToUpdate(product); // Al hacer clic en modificar, guardamos el producto en el estado
              setOpenUpdateProductForm(true); // Abrimos el formulario de actualización
            },
          },
          {
            name: "Eliminar",
            onClick: (product: any) => {
              setProductToDelete(product); // Guardamos el producto a eliminar
              setOpenDeleteProductModal(true); // Abrimos el modal de confirmación
            },
          },
        ]}
        getData={fetchProducts}
        setOpenCreationFormModal={setOpenCreateProductForm}
      />

      {/* Modal para crear producto */}
      {openCreateProductForm && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ProductForm onClose={() => setOpenCreateProductForm(false)} />
          </div>
        </div>
      )}

      {/* Modal para actualizar producto */}
      {openUpdateProductForm && productToUpdate && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ProductForm
              onClose={() => setOpenUpdateProductForm(false)}
              initialData={productToUpdate}
            />
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación de producto */}
      {openDeleteProductModal && productToDelete && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              ¿Estás seguro de eliminar este producto?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Esta acción no se puede deshacer y el producto se eliminará permanentemente.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDeleteProduct}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={() => setOpenDeleteProductModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProductsPage;

