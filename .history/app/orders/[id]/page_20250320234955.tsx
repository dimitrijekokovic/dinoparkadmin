"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Order {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  totalPrice: number;
  status: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    productDetails: {
      id: number;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    };
  }[];
}

export default function OrderDetailsPage() {
  const { id } = useParams(); // Ispravno dobijanje ID-a u Next.js 13+
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Order/${id}`
        );
        if (!res.ok) throw new Error("Narudžbina nije pronađena");
        setOrder(await res.json());
      } catch (error) {
        console.error("Greška pri učitavanju narudžbine:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        <p>Učitavanje narudžbine...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Detalji narudžbine #{order.id}
      </h1>
      {/* Prikaz narudžbine */}
    </div>
  );
}
