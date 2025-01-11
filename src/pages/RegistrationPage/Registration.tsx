import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import registrationSchema from "../../schemas/registrationSchema"; // Importamos el esquema
import { register as registrationRequest } from "../../api/authServices";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input"; // Importamos el componente Input

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });
  
  const [message, setMessage] = useState<string | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await registrationRequest(data);
      setMessage(response.message); // Suponiendo que el backend devuelve un mensaje de éxito
      setTimeout(() => {
        navigate("/auth/login");
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      setServerErrorMessage(error.message || "Error al crear la cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <section className="w-[70%] max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Regístrate
        </h2>

        {serverErrorMessage && <div className="text-red-500 mb-4">{serverErrorMessage}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <Input
              id="firstName"
              label="Primer Nombre (*)"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              id="lastName"
              label="Primer Apellido (*)"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              id="email"
              label="Email (*)"
              type="email"
              register={register}
              errors={errors}
            />
            <Input
              id="password"
              label="Contraseña (*)"
              type="password"
              register={register}
              errors={errors}
            />
            <Input
              id="confirmPassword"
              label="Confirmación de Contraseña (*)"
              type="password"
              register={register}
              errors={errors}
            />
            <Input
              id="phone"
              label="Número de Celular (*)"
              type="text"
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="form-btn" disabled={loading}>
              {loading ? "Cargando..." : "Crear cuenta"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Registration;

