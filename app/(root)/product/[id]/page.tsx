import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container } from "@/shared/Container";

import { ProductForm } from "@/shared/ProductForm";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="my-10 flex flex-1">
      <ProductForm product={product} />
    </Container>
  );
}
