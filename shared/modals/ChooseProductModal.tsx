"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/types";
import { ChooseProductForm } from "../ChooseProductForm";
import { ChoosePizzaForm } from "../ChoosePizzaForm";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
  className,
  product,
}) => {
  const router = useRouter();
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
      router.back();
    } catch (error) {
      toast.error(
        "Добавление в корзину не удалось. Пожалуйста, повторите попытку."
      );
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle className="hidden"></DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
};
