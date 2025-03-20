import { Product } from "@/types/product"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Popup from "./Popup"

export default function DeleteProductButton({ product }: { product: Product }) {
    const router = useRouter()
    const [popupOn, setPopupOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    async function handleDelete() {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${product.id}`, {
                method: "DELETE",
            })
            if (res.ok) {
                router.push("/products")
                router.refresh()
            } else {
                const resBody = await res.json()
                setError(resBody.message)
            }
        } catch (error) {
            setError("Error deleting product.")
        }
    }

    return (
        <>
            <button
                onClick={() => {
                    setPopupOn(true)
                }}
                className="red-button !py-2 font-medium"
            >
                <p>Delete product</p>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <Popup
                popupOn={popupOn}
                setPopupOn={setPopupOn}
            >
                <div className="bg-white p-6 rounded-xl w-full max-w-lg z-10 space-y-6">
                    <div className="bg-red-200 text-red-800 font-medium p-4 rounded-xl mb-6">Are you sure you want to delete this product?</div>
                    <div className="flex gap-2 flex-wrap justify-end">
                        <button
                            className="red-button"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? <div className="loader"></div> : <p>Delete</p>}
                        </button>
                        <button
                            onClick={() => {
                                setPopupOn(false)
                            }}
                            className="secondary-button"
                        >
                            Cancel
                        </button>
                    </div>
                    {error ? <p className="text-red-500 font-medium mt-6">{error}</p> : ""}
                </div>
            </Popup>
        </>
    )
}
