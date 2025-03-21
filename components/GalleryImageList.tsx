"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"

type GalleryImage = {
  id: number
  imageUrl: string
}

type GalleryResponse = {
  currentPage: number
  totalPages: number
  images: GalleryImage[]
}

export default function GalleryImageList() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Gallery/paged?page=${page}&pageSize=30`)
      const data: GalleryResponse = await res.json()
      setImages(data.images)
      setTotalPages(data.totalPages)
    }

    fetchImages()
  }, [page])

  const deleteImage = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Gallery/${id}`, { method: "DELETE" })
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id))
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            <img src={img.imageUrl} alt="Gallery" className="w-full h-56 object-cover" />
            <button
              onClick={() => deleteImage(img.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg border ${
                page === p ? "bg-green-500 text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
