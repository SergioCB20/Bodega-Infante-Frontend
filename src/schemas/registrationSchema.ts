import { z } from "zod";

// Crear el esquema de validación para el formulario
const registrationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "El nombre debe tener entre 2 y 50 caracteres" })
    .max(50, { message: "El nombre debe tener entre 2 y 50 caracteres" })
    .nonempty({ message: "El nombre no puede estar vacío" }),

  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener entre 2 y 50 caracteres" })
    .max(50, { message: "El apellido debe tener entre 2 y 50 caracteres" })
    .nonempty({ message: "El apellido no puede estar vacío" }),

  email: z
    .string()
    .email({ message: "El correo electrónico debe ser válido" })
    .nonempty({ message: "El correo electrónico no puede estar vacío" }),

  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .nonempty({ message: "La contraseña no puede estar vacía" }),

  confirmPassword: z
    .string()
    .nonempty({ message: "La confirmación de la contraseña no puede estar vacía" }),

  phone: z
    .string()
    .regex(/^[0-9]+$/, { message: "El número de celular debe contener solo números" })
    .min(9, { message: "El número de celular debe tener al menos 9 dígitos" })
    .optional()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], 
  });

export default registrationSchema;


