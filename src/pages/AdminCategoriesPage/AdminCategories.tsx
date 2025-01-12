import Panel from "../../components/Panel";
import { OptionPanelProps } from "../../interfaces/componentsProps";
import { useState } from "react";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

const AdminCategories = () => {

  // Estado para manejar qué acción fue seleccionada
  const [action, setAction] = useState<string | null>(null);

  const options: OptionPanelProps[] = [
    {
      title: "Crear categoría",
      description: "Agrega una nueva categoría al sistema",
      onClick: () => setAction('create'),
    },
    {
      title: "Actualizar categoría",
      description: "Edita los datos de una categoría existente",
      onClick: () => setAction('update'),
    },
    {
      title: "Eliminar categoría",
      description: "Elimina una categoría del sistema",
      onClick: () => setAction('delete'),
    },
  ];

  const renderActionComponent = () => {
    switch (action) {
      case 'create':
        return <CreateCategory />;
      case 'update':
        return <UpdateCategory />;
      case 'delete':
        return <DeleteCategory />;
      default:
        return <Panel title="¿Qué deseas hacer?" options={options} />;
    }
  };

  return (
    <div className="w-[70%] h-full p-14">
      {renderActionComponent()} 
    </div>
  );
};

export default AdminCategories;

