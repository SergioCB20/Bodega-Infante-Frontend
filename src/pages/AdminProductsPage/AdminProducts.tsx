import Panel from "../../components/Panel";
import { OptionPanelProps } from "../../interfaces/componentsProps";
import { useState } from "react";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const AdminProducts = () => {

  const [action, setAction] = useState<string | null>(null);

  const options: OptionPanelProps[] = [
    {
      title: "Crear producto",
      description: "Agrega un nuevo producto al sistema",
      onClick: () => setAction("create"),
    },
    {
      title: "Actualizar producto",
      description: "Edita los datos de un producto existente",
      onClick: () => setAction("update"),
    },
    {
      title: "Eliminar producto",
      description: "Elimina un producto del sistema",
      onClick: () => setAction("delete"),
    },
  ];

  const renderActionComponent = () => {
    switch (action) {
      case "create":
        return <CreateProduct />;
      case "update":
        return <UpdateProduct />;
      case "delete":
        return <DeleteProduct />;
      default:
        return <Panel title="¿Qué deseas hacer?" options={options} />
    }
  };

  return (
    <div className="w-[70%] h-full p-14">
      {renderActionComponent()}
    </div>
  );
}

export default AdminProducts
