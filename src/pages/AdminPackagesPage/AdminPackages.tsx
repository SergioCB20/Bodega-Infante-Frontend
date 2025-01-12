import { OptionPanelProps } from "../../interfaces/componentsProps";
import { useState } from "react";
import Panel from "../../components/Panel";
import CreatePackage from "./CreatePackage";
import UpdatePackage from "./UpdatePackage";
import DeletePackage from "./DeletePackage";

const AdminPackages = () => {
  // Estado para manejar qué acción fue seleccionada
  const [action, setAction] = useState<string | null>(null);

  const options: OptionPanelProps[] = [
    {
      title: "Crear paquete",
      description: "Agrega un nuevo paquete al sistema",
      onClick: () => setAction("create"),
    },
    {
      title: "Actualizar paquete",
      description: "Edita los datos de un paquete existente",
      onClick: () => setAction("update"),
    },
    {
      title: "Eliminar paquete",
      description: "Elimina un paquete del sistema",
      onClick: () => setAction("delete"),
    },
  ];

  const renderActionComponent = () => {
    switch (action) {
      case "create":
        return <CreatePackage />;
      case "update":
        return <UpdatePackage />;
      case "delete":
        return <DeletePackage />;
      default:
        return <Panel title="¿Qué deseas hacer?" options={options} />
    }
  };

  return (
    <div className="w-[70%] h-full p-14">
      {renderActionComponent()}
    </div>
  );
};

export default AdminPackages;
