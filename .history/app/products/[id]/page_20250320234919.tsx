"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ProductPage() {
  const { id } = useParams(); // Ispravno dobijanje ID-a u Next.js 13+
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${id}`
        );
        if (res.ok) {
          setProduct(await res.json());
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-4">
        <div className="flex gap-3 items-center mb-4">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <Link href="/products" className="primary-button">
            <FontAwesomeIcon icon={faArrowLeft} />
            Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
