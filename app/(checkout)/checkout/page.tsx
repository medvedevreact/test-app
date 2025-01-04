"use client";
import React, { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Title } from "@/shared/Title";
import { CheckoutCart } from "@/shared/CheckoutCart";
import { CheckoutPersonalForm } from "@/shared/CheckoutPersonalForm";
import { CheckoutAddressForm } from "@/shared/CheckoutAddressForm";
import { CheckoutSidebar } from "@/shared/CheckoutSidebar";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/schema/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

interface CheckoutProps {
  className?: string;
}

export default function Checkout({ className }: CheckoutProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const url = await createOrder(data);
      toast.success("Заказ успешно оформлен! Переход на оплату...");
      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      toast.error("Не удалось создать заказ...");
    }
  };

  return (
    <div className="pt-5">
      <Title
        size="xl"
        className="font-extrabold mb-8"
        text="Оформление заказа"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart />
              <CheckoutPersonalForm form={form} />
              <CheckoutAddressForm />
            </div>
            <CheckoutSidebar className="w-[450px]" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
