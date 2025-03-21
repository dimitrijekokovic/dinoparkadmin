"use client"

import { useState } from "react"
import Popup from "./Popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ImageInput from "./ImageInput"
import { useRouter } from "next/navigation"

export default function AddGalleryImage() {
  const [popupOn, setPopupOn] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [imageUrl, setImageUrl] = useState("")
  const [imageError, setImageError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleUpload = async () => {
    if (!imageFile) return setImageError("Please select an image.")

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("image", imageFile)

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Gallery`, {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setPopupOn(false)
        router.refresh()
      } else {
        const resBody = await res.json()
        setImageError(resBody.message || "Failed to upload.")
      }
    } catch (err) {
      setImageError("Unexpected error occurred.")
    }

    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setPopupOn(true)} className="primary-button flex items-center gap-2">
        <FontAwesomeIcon icon={faPlus} />
        Add image
      </button>

      <Popup popupOn={popupOn} setPopupOn={setPopupOn}>
        <div className="bg-white p-6 rounded-xl w-full max-w-lg z-10 space-y-6">
          <ImageInput
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imageError={imageError}
            setImageError={setImageError}
          />
          <div className="flex justify-end gap-2">
            <button className="primary-button" onClick={handleUpload} disabled={loading}>
              {loading ? <div className="loader"></div> : "Upload"}
            </button>
            <button onClick={() => setPopupOn(false)} className="secondary-button">
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}
