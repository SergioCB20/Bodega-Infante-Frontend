import { useState } from "react";
import AdminTable from "../../components/AdminTable";
import { getAllPackages, deletePackage } from "../../api/packageServices";
import PackageForm from "./PackageForm";

const AdminPackagesPage = () => {
  const [openCreatePackageForm, setOpenCreatePackageForm] = useState(false);
  const [openUpdatePackageForm, setOpenUpdatePackageForm] = useState(false);
  const [openDeletePackageConfirm, setOpenDeletePackageConfirm] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<any>(null);
  const [packageToUpdate, setPackageToUpdate] = useState<any>(null);

  const fetchPackages = async () => {
    return await getAllPackages();
  };

  // Función para manejar la eliminación de paquete
  const handleDeletePackage = async () => {
    if (packageToDelete) {
      await deletePackage(packageToDelete.package_id);
      setOpenDeletePackageConfirm(false);
      setPackageToDelete(null);
      window.location.reload();
    }
  };

  return (
    <section className="w-full">
      <AdminTable
        title="Paquetes"
        subtitle="Gestiona tus Paquetes"
        fields={[
          { name: "package_id", displayedName: "ID" },
          { name: "name", displayedName: "Nombre" },
          { name: "description", displayedName: "Descripción" },
          { name: "price", displayedName: "Precio" },
        ]}
        actions={[
          {
            name: "Modificar",
            onClick: (pkg: any) => {
              setPackageToUpdate(pkg);
              setOpenUpdatePackageForm(true);
            },
          },
          {
            name: "Eliminar",
            onClick: (pkg: any) => {
              setPackageToDelete(pkg);
              setOpenDeletePackageConfirm(true);
            },
          },
        ]}
        getData={fetchPackages}
        setOpenCreationFormModal={setOpenCreatePackageForm}
      />

      {/* Modal para crear paquete */}
      {openCreatePackageForm && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PackageForm onClose={() => setOpenCreatePackageForm(false)} />
          </div>
        </div>
      )}

      {/* Modal para actualizar paquete */}
      {openUpdatePackageForm && packageToUpdate && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PackageForm
              onClose={() => setOpenUpdatePackageForm(false)}
              initialData={packageToUpdate}
            />
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar paquete */}
      {openDeletePackageConfirm && packageToDelete && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas eliminar este paquete?</h3>
            <p className="mb-4">Esta acción no se puede deshacer y el paquete será eliminado permanentemente.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setOpenDeletePackageConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDeletePackage}
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

export default AdminPackagesPage;
