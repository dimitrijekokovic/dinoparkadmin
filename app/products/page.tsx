import { Product } from "@/types/product";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Page() {
    let products: Product[] = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product`);
        products = await res.json();
    } catch (error) {
        console.error(error);
    }

    return (
        <div className="p-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Products</h1>
                <Link href={"/products/new"} className="primary-button flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlus} />
                    Add product
                </Link>
            </div>

            {/* Grid layout za kartice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link 
                        key={product.id} 
                        href={`/products/${product.id}`} 
                        className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-600 text-sm truncate">{product.description}</p>
                            <p className="mt-2 font-bold text-gray-800">{product.price} din</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
