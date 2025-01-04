import { z } from "zod";

// Схема для формы входа
export const loginFormSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: z.string().min(6, { message: "Введите корректный пароль" }),
});

// Схема для формы регистрации
export const registerFormSchema = loginFormSchema
  .merge(
    z.object({
      confirmPassword: z
        .string()
        .min(6, { message: "Введите корректный пароль" }),
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

// Типы для значений форм
export type loginFormValues = z.infer<typeof loginFormSchema>;
export type registerFormValues = z.infer<typeof registerFormSchema>;
