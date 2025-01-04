import React from "react";
import { cn } from "@/lib/utils";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/components/ui/input";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);

  const handleClear = () => {
    setValue(name, "");
  };

  return (
    <div className={cn(className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          className="h-12 text-md"
          {...props}
          {...register(name, {
            required: required ? "Поле обязательно для заполнения" : false,
          })}
        />
        {value && <ClearButton onClick={handleClear} />}
      </div>
      {errors[name] && (
        <ErrorText text={errors[name]?.message as string} className="mt-2" />
      )}
    </div>
  );
};
