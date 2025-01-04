"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { WhiteBlock } from "@/shared/white-block";
import { CheckoutItemDetails } from "@/shared/CheckoutDetails";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart";

const VAT_PERCENTAGE = 0.15; // 15%
const DELIVERY_PRICE = 250;

interface CheckoutSidebarProps {
  className?: string;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
  className,
}) => {
  const { totalAmount } = useCartStore();

  const vat = totalAmount * VAT_PERCENTAGE;
  const total = totalAmount + vat + DELIVERY_PRICE;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="h-11 text-[34px] font-extrabold">
          {total.toFixed(2)} ₽
        </span>
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={`${totalAmount.toFixed(2)} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={`${vat.toFixed(2)} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={`${DELIVERY_PRICE.toFixed(2)} ₽`}
      />

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
