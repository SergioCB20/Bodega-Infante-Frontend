import { useState, useEffect, FC } from "react";
import { AdminTablesProps } from "../interfaces/componentsProps";
import { AdminTableData } from "../interfaces/dtos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminTable: FC<AdminTablesProps> = ({
  title,
  subtitle,
  fields,
  actions,
  getData,
  setOpenCreationFormModal,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      const dataFetched = await getData();
      console.log(dataFetched);
      if(!dataFetched){
        setData([]);
        return;
      }
      const dataToDisplay = dataFetched.map((item: any) => {
        const filteredItem: { [key: string]: any } = {};
        fields.forEach((field) => {
          if (item.hasOwnProperty(field.name)) {
            filteredItem[field.name] = item[field.name as keyof AdminTableData];
          }
        });
        return filteredItem;
      });
      setData(dataToDisplay);
    };

    fetchData();
  }, [fields, getData]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="container p-8 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              {title}
            </h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {data.length} {title.toLowerCase()}
            </span>
          </div>
          {subtitle && <span className="text-sm">{subtitle}</span>}
        </div>

        {setOpenCreationFormModal && (
          <div className="flex items-center mt-4 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            onClick={()=>setOpenCreationFormModal(true)}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Agregar {title.toLowerCase()}</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              {fields.map((field) => (
                <th
                  key={field.displayedName}
                  className="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  {field.displayedName}
                </th>
              ))}
              {actions.map((action, index) => (
                <th
                  key={index}
                  className="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  {action.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  {fields.map((field, idx) => (
                    <td
                      key={idx}
                      className="py-2 px-4 text-sm text-gray-600 dark:text-gray-400"
                    >
                      {item[field.name as keyof AdminTableData]}
                    </td>
                  ))}
                  {actions.map((action, idx) => (
                    <td
                      key={idx}
                      className="py-2 px-4 text-sm text-blue-600 cursor-pointer"
                      onClick={() => action.onClick(item)}
                    >
                      {action.name}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={fields.length + actions.length}
                  className="py-2 px-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No se encontraron {title.toLowerCase()}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 sm:flex sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Página{" "}
          <span className="font-medium text-gray-700 dark:text-gray-100">
            {currentPage} de {Math.ceil(data.length / itemsPerPage) === 0?1:Math.ceil(data.length / itemsPerPage)}
          </span>
        </div>

        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
          <button
            onClick={prevPage}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Anterior</span>
          </button>

          <button
            onClick={nextPage}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Siguiente</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminTable;
