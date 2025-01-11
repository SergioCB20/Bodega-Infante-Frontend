import {z} from "zod";

const loginSchema = z.object({
    email: z
        .string()
        .email({message: "Email invalido"})
        .nonempty({message: "Este campo no puede estar vacio"}),
    
    password: z
        .string()
        .min(6, {message: "La contraseña debe tener al menos 6 caracteres"})
        .nonempty({message: "Este campo no puede estar vacio"})
})

export default loginSchema;