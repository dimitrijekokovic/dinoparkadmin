"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch narudžbine sa API-ja
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Order/waiting"
        );
        if (!res.ok) throw new Error("Greška pri dohvaćanju podataka");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Greška pri učitavanju narudžbina:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Narudžbine na čekanju
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Ime</th>
              <th className="py-3 px-6 text-left">Cena (RSD)</th>
              <th className="py-3 px-6 text-left">Adresa</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Telefon</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{order.name}</td>
                  <td className="py-3 px-6">{order.totalPrice} RSD</td>
                  <td className="py-3 px-6">{order.address}</td>
                  <td className="py-3 px-6">{order.email}</td>
                  <td className="py-3 px-6">{order.phone}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      order.status === "Waiting"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link href={`/orders/${order.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
                        Info
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Nema narudžbina na čekanju.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
