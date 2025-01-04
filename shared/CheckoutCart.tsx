"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { WhiteBlock } from "./white-block";
import { useCartStore } from "@/store/cart";
import { CheckoutItem } from "./CarttItem";

interface CheckoutCartProps {
  className?: string;
}

const pizzaSize: Variant[] = [
  { name: "Маленькая", value: "20" },
  { name: "Средняя", value: "30" },
  { name: "Большая", value: "40" },
];

const pizzaType: Variant[] = [
  { name: "Традиционное", value: "1" },
  { name: "Тонкое", value: "2" },
];

export const CheckoutCart: React.FC<CheckoutCartProps> = ({ className }) => {
  const {
    items,
    totalAmount,
    fetchCartItems,
    error,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const getDetails = (item) => {
    const sizeName = pizzaSize?.find(
      (size) => size.value === item.pizzaSize?.toString()
    )?.name;
    const typeName = pizzaType?.find(
      (type) => type.value === item.type?.toString()
    )?.name;
    const ingredientsNames = item?.ingredients
      .map((ingredient) => ingredient?.name)
      .join(", ");
    return (
      <>
        Размер: {sizeName || "-"}
        <br />
        Тип теста: {typeName || "-"}
        <br />
        Ингредиенты: {ingredientsNames || "-"}
      </>
    );
  };

  if (error) {
    return <div>Ошибка загрузки корзины</div>;
  }

  return (
    <WhiteBlock title="1. Корзина" className={cn("p-5", className)}>
      {items.length > 0 ? (
        items.map((item) => (
          <CheckoutItem
            key={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            details={getDetails(item)}
            onClickCountButton={(type) => {
              const newQuantity =
                type === "plus" ? item.quantity + 1 : item.quantity - 1;
              updateItemQuantity(item.id, newQuantity);
            }}
            onClickRemove={() => removeCartItem(item.id)}
          />
        ))
      ) : (
        <div>Ваша корзина пуста</div>
      )}
    </WhiteBlock>
  );
};
