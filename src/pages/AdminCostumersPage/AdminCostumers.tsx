import { useState } from "react";
import AdminTable from "../../components/AdminTable";
import { getAllCostumers } from "../../api/adminServices"; // Asume que la ruta es correcta
import { CustomerFormData } from "../../interfaces/dtos";

const AdminCustomers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormData | null>(null);

  // Función para obtener los clientes
  const fetchCustomers = async () => {
    return await getAllCostumers(); // Esta función obtiene los clientes de la API
  };

  return (
    <section className="w-full">

      {/* Componente AdminTable */}
      <AdminTable
        title="Clientes"
        subtitle="Gestiona los clientes de tu plataforma"
        fields={[
            {name:"id",displayedName:"ID"},
            {name:"firstName",displayedName:"Nombre"},
             {name:"lastName",displayedName:"Apellido"}, 
             {name:"email",displayedName:"Correo electrónico"},
            {name:"phone",displayedName:"Celular"}]}
        actions={[
          {
            name: "Ver detalles",
            onClick: (customer) =>
              setSelectedCustomer(customer as CustomerFormData),
          },
          {
            name: "Editar",
            onClick: (customer) => console.log("Editar cliente", customer),
          },
        ]}
        getData={fetchCustomers} // Obtener clientes
      />

      {/* Modal para detalles del cliente */}
      {selectedCustomer && (
        <div>
          <h3>
            {selectedCustomer.firstName} {selectedCustomer.lastName}
          </h3>
          <p>{selectedCustomer.email}</p>
          <p>{selectedCustomer.phone}</p>
        </div>
      )}
    </section>
  );
};

export default AdminCustomers;
