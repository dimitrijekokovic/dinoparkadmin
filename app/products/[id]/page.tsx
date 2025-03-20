import ProductForm from "@/components/ProductForm"
import { Product } from "@/types/product"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default async function page({ params: { id } }: { params: { id: string } }) {
    let product: Product | undefined

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${id}`)
        if (res.ok) {
            product = await res.json()
        }
    } catch (error) {
        console.error(error)
    }

    console.log(product)

    if (!product) {
        return (
            <div className="p-4">
                <div className="flex gap-3 items-center mb-4 ">
                    <h1 className="text-2xl  font-semibold">Product not found</h1>
                    <Link
                        href={"/products"}
                        className="primary-button"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Products
                    </Link>
                </div>
            </div>
        )
    }

    return <ProductForm product={product} />
}
