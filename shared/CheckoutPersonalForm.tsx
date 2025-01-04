import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/shared/form-components/form-input";
import { WhiteBlock } from "@/shared/white-block";

interface CheckoutPersonalFormProps {
  form: any; // Замените на тип, который используется в useForm
}

export const CheckoutPersonalForm: React.FC<CheckoutPersonalFormProps> = ({
  form,
}) => {
  return (
    <WhiteBlock title="1. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
