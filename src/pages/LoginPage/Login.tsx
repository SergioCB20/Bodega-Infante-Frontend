import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/loginSchema";
import Input from "../../components/Input";
import { login } from "../../api/authServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [message, setMessage] = useState<string | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await login(data);
      localStorage.setItem("token", response.token);
      setMessage(response.message);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      setServerErrorMessage(
        error.message || "Error al crear la cuenta. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex p-20 px-8 justify-center items-center">
      <section className="flex flex-col w-[70%] max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-64">
        <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
              Bienvenido a{" "}
              <span className="text-blue-600 font-bold">Bodega Infante</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 md:text-gray-400">
              Inicia sesión para continuar
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
          <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 p-6">
              <Input
                id="email"
                label="Email (*)"
                type="email"
                register={register}
                errors={errors}
                placeholder="john@example.com"
              />
              <Input
                id="password"
                label="Contraseña (*)"
                type="password"
                register={register}
                errors={errors}
                placeholder="********"
              />
              <div className="flex justify-end mt-3">
                {serverErrorMessage && (
                  <div className="text-red-500 mb-4">{serverErrorMessage}</div>
                )}
                {message && (
                  <div className="text-green-500 mb-2 me-4">{message}</div>
                )}
                <button
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
