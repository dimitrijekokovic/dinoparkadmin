"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch narudžbine po ID-ju
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Order/${params.id}`
        );
        if (!res.ok) throw new Error("Narudžbina nije pronađena");
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Greška pri učitavanju narudžbine:", error);
      }
    };
    fetchOrder();
  }, [params.id]);

  // Funkcija za slanje narudžbine
  const handleShipOrder = async () => {
    if (!order) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Order/${order.id}/ship`,
        { method: "PUT", headers: { Accept: "*/*" } }
      );
      if (!res.ok) throw new Error("Greška pri slanju narudžbine");
      setOrder((prevOrder) => prevOrder ? { ...prevOrder, status: "Shipped" } : null);
    } catch (error) {
      console.error("Greška pri slanju narudžbine:", error);
    }
    setLoading(false);
  };

  // Funkcija za brisanje narudžbine
  const handleDeleteOrder = async () => {
    if (!order) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Order/${order.id}`,
        { method: "DELETE", headers: { Accept: "*/*" } }
      );
      if (!res.ok) throw new Error("Greška pri brisanju narudžbine");
      router.push("/orders"); // Nakon brisanja vrati korisnika na listu narudžbina
    } catch (error) {
      console.error("Greška pri brisanju narudžbine:", error);
    }
    setLoading(false);
  };

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

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <p className="text-lg"><strong>Ime:</strong> {order.name}</p>
        <p className="text-lg"><strong>Adresa:</strong> {order.address}</p>
        <p className="text-lg"><strong>Email:</strong> {order.email}</p>
        <p className="text-lg"><strong>Telefon:</strong> {order.phone}</p>
        <p className="text-lg"><strong>Ukupna cena:</strong> {order.totalPrice} RSD</p>
        <p className={`text-lg font-semibold ${order.status === "Waiting" ? "text-orange-500" : "text-green-600"}`}>
          <strong>Status:</strong> {order.status}
        </p>
      </div>

      {/* Lista proizvoda */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Proizvodi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {order.items.map((item) => (
          <div key={item.productId} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={item.productDetails.imageUrl}
              alt={item.productDetails.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{item.productDetails.name}</h3>
            <p className="text-gray-600">{item.productDetails.description}</p>
            <p className="text-gray-800 font-semibold">Cena: {item.productDetails.price} RSD</p>
            <p className="text-gray-800 font-semibold">Količina: {item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Dugmad za akcije */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleDeleteOrder}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Brisanje..." : "Obriši narudžbinu"}
        </button>

        {order.status === "Waiting" && (
          <button
            onClick={handleShipOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Slanje..." : "Pošalji narudžbinu"}
          </button>
        )}
      </div>
    </div>
  );
}
