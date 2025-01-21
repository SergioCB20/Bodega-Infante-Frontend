import { useState } from "react";

const QuantityModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen) return null;

  const handleSave = () => {
    if (quantity > 0) {
      onSave(quantity);
      setQuantity(1); // Restablece la cantidad para el próximo uso
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Ingrese la cantidad</h2>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input w-full mb-4"
          min={1}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal
