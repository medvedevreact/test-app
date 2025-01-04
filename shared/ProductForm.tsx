"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ChoosePizzaForm } from "./ChoosePizzaForm";
import { ChooseProductForm } from "./ChooseProductForm";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cart";

interface ProductFormProps {
  className?: string;
  product: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  className,
  product,
}) => {
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const { addCartItem } = useCartStore();

  const handleAddToCart = async (
    productItemId: number,
    ingredients?: number[]
  ) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success("Элемент успешно добавлен в корзину!");
    } catch (error) {
      toast.error(
        "Добавление в корзину не удалось. Пожалуйста, повторите попытку."
      );
    }
  };
  return (
    <>
      {isPizzaForm ? (
        <ChoosePizzaForm
          items={product.items}
          name={product.name}
          imageUrl={product.imageUrl}
          ingredients={product.ingredients}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <ChooseProductForm
          name={product.name}
          imageUrl={product.imageUrl}
          id={product.id}
          items={product.items}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};
