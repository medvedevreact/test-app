"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { CartButton } from "./CartButton";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthModal } from "./modals/AuthModal";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  loginFormValues,
  registerFormSchema,
  registerFormValues,
} from "./schema/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { registerUser } from "@/app/actions";

interface HeaderProps {
  className?: string;
  hasSearch: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  hasSearch = true,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const loginForm = useForm<loginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<registerFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, [searchParams, router]);

  const handleAuthButtonClick = () => {
    if (!session) {
      setIsModalOpen(true);
    } else {
      signOut();
    }
  };

  const onLoginSubmit = async (data: loginFormValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (resp?.error) {
        toast.error(resp.error);
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при входе. Пожалуйста, попробуйте снова.");
    }
  };

  const onRegisterSubmit = async (data: registerFormValues) => {
    const fullName = "Иван Иванов";
    try {
      await registerUser({
        email: data.email,
        fullName,
        password: data.password,
      });

      toast.error("Регистрация успешна 📝. Подтвердите свою почту", {
        icon: "✅",
      });
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при регистрации. Пожалуйста, попробуйте снова.");
    }
  };

  return (
    <header className={cn("border border-b ", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex gap-2 cursor-pointer">
            <Image
              src="/img/Логотип.png"
              alt="Logo Image"
              width={35}
              height={35}
            ></Image>
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>
        {hasSearch && <SearchInput />}
        <div className="flex gap-1">
          <Button variant={"outline"} onClick={handleAuthButtonClick}>
            <FaUser /> {session ? "Выйти" : "Войти"}
          </Button>
          {hasSearch && <CartButton />}
        </div>
      </Container>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2 className="text-xl font-bold mb-4">
            {isRegister ? "Регистрация" : "Войти"}
          </h2>
          <p className="mb-4">
            {isRegister
              ? "Пожалуйста, зарегистрируйтесь."
              : "Пожалуйста, войдите в свою учетную запись."}
          </p>
          {isRegister ? (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
              <Input
                placeholder="Ваша почта..."
                className="mb-2"
                type="text"
                {...registerForm.register("email")}
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
              <Input
                placeholder="Ваш пароль..."
                className="mb-2"
                type="password"
                {...registerForm.register("password")}
              />
              {registerForm.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
              <Input
                placeholder="Подтвердите пароль..."
                className="mb-2"
                type="password"
                {...registerForm.register("confirmPassword")}
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
              <Button
                className="w-full mb-4 border border-[1px] flex items-center justify-center"
                onClick={() => {
                  signIn("google");
                  setIsModalOpen(false);
                }}
                variant={"secondary"}
              >
                <FaGoogle className="mr-2" />
                Зарегистрироваться с помощью Google
              </Button>
              <div className="flex justify-end gap-4">
                <Button
                  variant={"outline"}
                  onClick={() => setIsModalOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">Зарегистрироваться</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
              <Input
                placeholder="Ваша почта..."
                className="mb-2"
                type="text"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
              <Input
                placeholder="Ваш пароль..."
                className="mb-2"
                type="password"
                {...loginForm.register("password")}
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
              <Button
                className="w-full mb-4 border border-[1px] flex items-center justify-center"
                onClick={() => {
                  signIn("google");
                  setIsModalOpen(false);
                }}
                variant={"secondary"}
              >
                <FaGoogle className="mr-2" />
                Войти с помощью Google
              </Button>
              <div className="flex justify-end gap-4">
                <Button
                  variant={"outline"}
                  onClick={() => setIsModalOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">Войти</Button>
              </div>
            </form>
          )}
          <div className="mt-4 text-center">
            <Button variant={"link"} onClick={() => setIsRegister(!isRegister)}>
              {isRegister
                ? "Уже есть аккаунт? Войти"
                : "Нет аккаунта? Зарегистрироваться"}
            </Button>
          </div>
        </div>
      </AuthModal>
    </header>
  );
};
