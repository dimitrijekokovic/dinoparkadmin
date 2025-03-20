"use client";

import { Product } from "@/types/product";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Input from "./Input";
import ImageInput from "./ImageInput";
import { useRouter } from "next/navigation";
import DeleteProductButton from "./DeleteProductButton";

export default function ProductForm({ product }: { product?: Product }) {
    const router = useRouter();
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price ? product?.price.toString() : "");
    
    // Dodata ImageInput logika
    const [imageFile, setImageFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || ""); // Ako postoji slika, koristi je

    const [loading, setLoading] = useState(false);

    async function createProduct() {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                }),
            });

            const resBody = await res.json();
            const newProductId = resBody.id;

            if (imageFile) {
                const formData = new FormData();
                formData.set("image", imageFile);
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${newProductId}/upload-image`, {
                    method: "POST",
                    body: formData,
                });
            }

            if (newProductId) {
                router.push(`/products/${newProductId}`);
            }
        } catch (error) {
            console.error("Error creating product:", error);
        }
        setLoading(false);
    }

    async function updateProduct() {
        if (!product) return;
        setLoading(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                }),
            });

            if (imageFile) {
                const formData = new FormData();
                formData.set("image", imageFile);
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${product.id}/upload-image`, {
                    method: "POST",
                    body: formData,
                });
            }

            router.refresh();
        } catch (error) {
            console.error("Error updating product:", error);
        }
        setLoading(false);
    }

    return (
        <div className="p-4 relative">
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-300/50 flex justify-center items-center">
                    <div className="loader-big"></div>
                </div>
            )}

            <div className="flex gap-3 items-center mb-4">
                <h1 className="text-2xl font-semibold">{product ? product.name : "Add new product"}</h1>
                <Link href={"/products"} className="primary-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Products
                </Link>
            </div>

            <div className="space-y-4">
                <Input value={name} setValue={setName} placeholder="Name" className="primary-input" />
                <Input value={description} setValue={setDescription} placeholder="Description" className="primary-input" />
                <Input value={price} setValue={setPrice} placeholder="Price" type="number" className="primary-input" />

                {/* Dodato ImageInput polje */}
                <ImageInput
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                />

                <button
                    disabled={loading}
                    onClick={product ? updateProduct : createProduct}
                    className="primary-button"
                >
                    {product ? "Update product" : "Save product"}
                </button>
            </div>

            {product && (
                <div>
                    <div className="my-8 h-px bg-gray-200 w-full"></div>
                    <DeleteProductButton product={product} />
                </div>
            )}
        </div>
    );
}
