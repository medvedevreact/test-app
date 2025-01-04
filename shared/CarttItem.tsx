"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Trash2Icon } from "lucide-react";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  disabled?: boolean;
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-white p-5 gap-6",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 md:w-32 md:h-32 object-cover"
      />

      <div className="flex-1 flex flex-col md:flex-row justify-between">
        <div className="md:mr-6">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500">{details}</p>
        </div>

        <div className="flex items-center justify-between md:justify-end mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onClickCountButton && onClickCountButton("minus")}
              className={cn("bg-gray-200 px-2 py-1 rounded", {
                "opacity-50 pointer-events-none": quantity === 1,
              })}
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => onClickCountButton && onClickCountButton("plus")}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <span className="text-gray-700">₽ {price.toFixed(2)}</span>
            <button
              type="button"
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            >
              <Trash2Icon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
